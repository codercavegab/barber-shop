import { BookingRepository } from "@/domain/repositories";

export type ListAvailableSlotsInput = {
  barberId: string;
  serviceId: string;
  rangeStart: Date;
  rangeEnd: Date;
};

/**
 * Devuelve instantes de inicio de turno disponibles calculando horarios laborales,
 * bloqueos (time off) y reservas confirmadas existentes.
 */
export async function listAvailableSlots(
  input: ListAvailableSlotsInput,
  bookingRepository: BookingRepository
): Promise<Date[]> {
  const { barberId, serviceId, rangeStart, rangeEnd } = input;

  if (rangeStart >= rangeEnd) {
    return [];
  }

  // 1. Obtener barbero con sus disponibilidades semanales y bloqueos en el rango
  // 2. Obtener detalles del servicio (duración)
  // 3. Obtener reservas confirmadas en el rango
  const [barber, service, appointments] = await Promise.all([
    bookingRepository.getBarberWithAvailability(barberId, rangeStart, rangeEnd),
    bookingRepository.getService(serviceId),
    bookingRepository.getAppointments(barberId, rangeStart, rangeEnd),
  ]);

  if (!barber || !service) {
    return [];
  }

  const durationMs = service.durationMinutes * 60 * 1000;
  const availableSlots: Date[] = [];

  // Recorremos día por día dentro del rango solicitado
  const currentDay = new Date(rangeStart);
  // Normalizar el final del rango
  const endLimit = rangeEnd.getTime();

  while (currentDay.getTime() < endLimit) {
    // Obtener día de la semana (0 = lunes ... 6 = domingo en nuestro dominio)
    // En JS Date: 0 = domingo, 1 = lunes ... 6 = sábado. Mapeamos a nuestro dominio:
    const jsDay = currentDay.getDay();
    const domainDay = jsDay === 0 ? 6 : jsDay - 1;

    // Filtrar disponibilidades para este día de la semana
    const dailyAvailabilities = barber.weeklyAvailabilities.filter(
      (wa) => wa.dayOfWeek === domainDay
    );

    for (const availability of dailyAvailabilities) {
      // Parsear startTime y endTime ("HH:MM")
      const [startHour, startMin] = availability.startTime.split(":").map(Number);
      const [endHour, endMin] = availability.endTime.split(":").map(Number);

      // Crear las fechas de inicio y fin laboral para este día específico
      const workStart = new Date(currentDay);
      workStart.setHours(startHour, startMin, 0, 0);

      const workEnd = new Date(currentDay);
      workEnd.setHours(endHour, endMin, 0, 0);

      // Ajustar con el rango solicitado
      const slotStartLimit = Math.max(workStart.getTime(), rangeStart.getTime());
      const slotEndLimit = Math.min(workEnd.getTime(), rangeEnd.getTime());

      // Generar turnos cada 30 minutos (frecuencia de intervalos comunes en barberías) o según duración
      const intervalMs = 30 * 60 * 1000; // Intervalos de 30 mins
      let slotTime = slotStartLimit;

      while (slotTime + durationMs <= slotEndLimit) {
        const slotStart = new Date(slotTime);
        const slotEnd = new Date(slotTime + durationMs);

        // Validar que no se solape con ningún TimeOff (bloqueo)
        const isBlocked = barber.timeOffs.some(
          (to) => slotStart < to.endsAt && slotEnd > to.startsAt
        );

        // Validar que no se solape con ningún Appointment existente
        const hasAppointmentConflict = appointments.some(
          (app) => slotStart < app.endsAt && slotEnd > app.startsAt
        );

        if (!isBlocked && !hasAppointmentConflict) {
          availableSlots.push(slotStart);
        }

        slotTime += intervalMs;
      }
    }

    // Avanzar al día siguiente a las 00:00:00
    currentDay.setDate(currentDay.getDate() + 1);
    currentDay.setHours(0, 0, 0, 0);
  }

  // Ordenar de forma ascendente
  return availableSlots.sort((a, b) => a.getTime() - b.getTime());
}