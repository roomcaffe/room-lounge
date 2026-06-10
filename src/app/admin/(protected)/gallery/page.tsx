import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <div className="mb-10">
        <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)]">— Menaxho</div>
        <h1 className="font-display text-4xl md:text-5xl text-[#f5ede0] mt-2">Galeria</h1>
        <p className="text-[#a99c80] mt-3">Upload momente, atmosferë, dhe eventet e Room-it.</p>
      </div>
      <GalleryManager initial={images} />
    </div>
  );
}
