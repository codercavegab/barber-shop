export interface BarberWithAvailability {
  id: string;
  name: string;
  active: boolean;
  weeklyAvailabilities: {
    id: string;
    dayOfWeek: number;
    startTime: string; // e.g., "09:00"
    endTime: string;   // e.g., "18:00"
  }[];
  timeOffs: {
    id: string;
    startsAt: Date;
    endsAt: Date;
  }[];
}

export interface ServiceDetails {
  id: string;
  name: string;
  durationMinutes: number;
  priceCents: number;
  active: boolean;
}

export interface SimpleAppointment {
  id: string;
  startsAt: Date;
  endsAt: Date;
}

export interface BookingRepository {
  getBarberWithAvailability(barberId: string, start: Date, end: Date): Promise<BarberWithAvailability | null>;
  getService(serviceId: string): Promise<ServiceDetails | null>;
  getAppointments(barberId: string, start: Date, end: Date): Promise<SimpleAppointment[]>;
}