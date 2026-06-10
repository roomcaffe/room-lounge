import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const b = await req.json();
  const it = await prisma.menuItem.create({
    data: {
      name: b.name,
      category: b.category,
      price: parseFloat(b.price),
      description: b.description || null,
      image: b.image || null,
      active: b.active !== false,
      sortOrder: b.sortOrder || 0,
    },
  });
  return NextResponse.json({ item: it });
}
