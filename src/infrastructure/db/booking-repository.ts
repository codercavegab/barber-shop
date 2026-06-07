import { BookingRepository, BarberWithAvailability, ServiceDetails, SimpleAppointment } from "@/domain/repositories";
import { prisma } from "./prisma";

export class PrismaBookingRepository implements BookingRepository {
  async getBarberWithAvailability(
    barberId: string,
    start: Date,
    end: Date
  ): Promise<BarberWithAvailability | null> {
    const barber = await prisma.barber.findUnique({
      where: { id: barberId, active: true },
      include: {
        weeklyAvailabilities: true,
        timeOffs: {
          where: {
            startsAt: { lte: end },
            endsAt: { gte: start },
          },
        },
      },
    });

    if (!barber) return null;

    return {
      id: barber.id,
      name: barber.name,
      active: barber.active,
      weeklyAvailabilities: barber.weeklyAvailabilities.map((wa) => ({
        id: wa.id,
        dayOfWeek: wa.dayOfWeek,
        startTime: wa.startTime,
        endTime: wa.endTime,
      })),
      timeOffs: barber.timeOffs.map((to) => ({
        id: to.id,
        startsAt: to.startsAt,
        endsAt: to.endsAt,
      })),
    };
  }

  async getService(serviceId: string): Promise<ServiceDetails | null> {
    return await prisma.service.findUnique({
      where: { id: serviceId, active: true },
    });
  }

  async getAppointments(
    barberId: string,
    start: Date,
    end: Date
  ): Promise<SimpleAppointment[]> {
    return await prisma.appointment.findMany({
      where: {
        barberId,
        startsAt: { lte: end },
        endsAt: { gte: start },
        status: "CONFIRMED",
      },
      select: {
        id: true,
        startsAt: true,
        endsAt: true,
      },
    });
  }
}