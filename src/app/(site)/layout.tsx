import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
