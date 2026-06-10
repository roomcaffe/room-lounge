import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { z } from "zod";

const patchSchema = z.object({
  status: z.enum(["pending", "confirmed", "rejected", "completed", "no_show"]).optional(),
  adminNote: z.string().optional(),
  tableId: z.string().nullable().optional(),
});

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    const data = patchSchema.parse(await req.json());
    const r = await prisma.reservation.update({
      where: { id },
      data,
    });
    return NextResponse.json({ ok: true, reservation: r });
  } catch {
    return NextResponse.json({ error: "Gabim" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.reservation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
