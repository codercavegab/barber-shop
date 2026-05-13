export type ListAvailableSlotsInput = {
  barberId: string;
  serviceId: string;
  rangeStart: Date;
  rangeEnd: Date;
};

/**
 * Devuelve instantes de inicio de turno disponibles (pendiente: reglas de negocio + persistencia).
 */
export async function listAvailableSlots(
  input: ListAvailableSlotsInput,
): Promise<Date[]> {
  void input;
  return [];
}
