import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(6),
  whatsapp: z.string().min(6),
  date: z.string().min(1),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Orar i pavlefshëm").refine((value) => value <= "20:30", "Rezervimet pranohen vetëm deri në 20:30"),
  guests: z.coerce.number().min(1).max(50),
  // Mbështet zonat e reja + ato të vjetra (backwards compat)
  area: z.enum(["main", "bar", "vip", "terrace", "indoor", "outdoor", "stage"]),
  tableId: z.string().optional(),
  tableName: z.string().optional(),
  specialRequest: z.string().optional(),
  eventNight: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // Resolve tableId nga tableName nëse është dërguar
    let resolvedTableId = data.tableId;
    if (!resolvedTableId && data.tableName) {
      const t = await prisma.table.findFirst({ where: { name: data.tableName } });
      resolvedTableId = t?.id;
    }

    const reservation = await prisma.reservation.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        whatsapp: data.whatsapp,
        date: new Date(data.date),
        time: data.time,
        guests: data.guests,
        area: data.area,
        tableId: resolvedTableId,
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
