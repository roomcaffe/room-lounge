import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const data: Record<string, unknown> = {};
  if (b.name !== undefined) data.name = b.name;
  if (b.capacity !== undefined) data.capacity = parseInt(b.capacity);
  if (b.area !== undefined) data.area = b.area;
  if (b.available !== undefined) data.available = b.available;
  if (b.notes !== undefined) data.notes = b.notes || null;
  const t = await prisma.table.update({ where: { id }, data });
  return NextResponse.json({ table: t });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.table.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
