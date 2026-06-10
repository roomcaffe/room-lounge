import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const b = await req.json();
  const data: Record<string, unknown> = {};
  if (b.title !== undefined) data.title = b.title;
  if (b.artist !== undefined) data.artist = b.artist || null;
  if (b.date !== undefined) data.date = new Date(b.date);
  if (b.time !== undefined) data.time = b.time;
  if (b.coverImage !== undefined) data.coverImage = b.coverImage || null;
  if (b.description !== undefined) data.description = b.description || null;
  if (b.status !== undefined) data.status = b.status;
  const e = await prisma.event.update({ where: { id }, data });
  return NextResponse.json({ event: e });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
