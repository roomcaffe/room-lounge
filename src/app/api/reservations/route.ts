import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6),
  whatsapp: z.string().min(6),
  date: z.string().min(1),
  time: z.string().min(1),
  guests: z.coerce.number().min(1).max(50),
  area: z.enum(["indoor", "outdoor", "vip", "stage"]),
  specialRequest: z.string().optional(),
  eventNight: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const reservation = await prisma.reservation.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        date: new Date(data.date),
        time: data.time,
        guests: data.guests,
        area: data.area,
        specialRequest: data.specialRequest,
        eventNight: data.eventNight ?? false,
        status: "pending",
      },
    });

    return NextResponse.json({ ok: true, id: reservation.id });
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        { error: e.issues[0]?.message || "Të dhëna të pavlefshme" },
        { status: 400 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Gabim në server" }, { status: 500 });
  }
}
