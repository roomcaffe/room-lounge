import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const s = await getSession();
  if (!s) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ct = req.headers.get("content-type") || "";
  if (ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const caption = (form.get("caption") as string) || "";
    const category = (form.get("category") as string) || "general";
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, filename), buf);
    const url = `/uploads/${filename}`;
    const img = await prisma.galleryImage.create({ data: { url, caption, category } });
    return NextResponse.json({ image: img });
  }

  const b = await req.json();
  const img = await prisma.galleryImage.create({
    data: { url: b.url, caption: b.caption || null, category: b.category || "general" },
  });
  return NextResponse.json({ image: img });
}
