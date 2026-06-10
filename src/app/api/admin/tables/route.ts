import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const t = await prisma.table.create({
    data: {
      name: b.name,
      capacity: parseInt(b.capacity),
      area: b.area,
      available: b.available !== false,
      notes: b.notes || null,
    },
  });
  return NextResponse.json({ table: t });
}
