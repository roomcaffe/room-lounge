import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { GalleryView } from "@/components/gallery/GalleryView";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Brenda Room Lounge. Atmosferë, ngjarje, momente nga 18 vite.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  let images: { id: string; url: string; caption: string | null; category: string }[] = [];
  try {
    images = await prisma.galleryImage.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, url: true, caption: true, category: true },
    });
  } catch (err) {
    console.error("[gallery] failed", err);
  }
  return <GalleryView images={images} />;
}
