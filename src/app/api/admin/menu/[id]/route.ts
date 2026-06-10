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
  if (b.category !== undefined) data.category = b.category;
  if (b.price !== undefined) data.price = parseFloat(b.price);
  if (b.description !== undefined) data.description = b.description || null;
  if (b.image !== undefined) data.image = b.image || null;
  if (b.active !== undefined) data.active = b.active;
  const it = await prisma.menuItem.update({ where: { id }, data });
  return NextResponse.json({ item: it });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.menuItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
