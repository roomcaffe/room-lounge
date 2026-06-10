import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const e = await prisma.event.create({
    data: {
      title: b.title,
      artist: b.artist || null,
      date: new Date(b.date),
      time: b.time,
      coverImage: b.coverImage || null,
      description: b.description || null,
      status: b.status || "draft",
    },
  });
  return NextResponse.json({ event: e });
}
