import { NextResponse } from "next/server";
import { listAvailableSlots } from "@/application/booking/list-available-slots";
import { PrismaBookingRepository } from "@/infrastructure/db/booking-repository";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const barberId = searchParams.get("barberId");
    const serviceId = searchParams.get("serviceId");
    const startStr = searchParams.get("start");
    const endStr = searchParams.get("end");

    if (!barberId || !serviceId) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos: barberId y serviceId" },
        { status: 400 }
      );
    }

    const rangeStart = startStr ? new Date(startStr) : new Date();
    // Por defecto, buscar turnos para los próximos 7 días si no se especifica 'end'
    const rangeEnd = endStr 
      ? new Date(endStr) 
      : new Date(rangeStart.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (isNaN(rangeStart.getTime()) || isNaN(rangeEnd.getTime())) {
      return NextResponse.json(
        { error: "Formato de fecha inválido (debe ser ISO 8601)" },
        { status: 400 }
      );
    }

    const repo = new PrismaBookingRepository();
    const slots = await listAvailableSlots(
      {
        barberId,
        serviceId,
        rangeStart,
        rangeEnd,
      },
      repo
    );

    return NextResponse.json({
      success: true,
      count: slots.length,
      slots,
    });
  } catch (error) {
    console.error("Error al listar turnos disponibles:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}