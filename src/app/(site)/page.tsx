import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { TheSpace } from "@/components/home/TheSpace";
import { Chapters } from "@/components/home/Chapters";
import { Drinks } from "@/components/home/Drinks";
import { EventsTeaser } from "@/components/home/EventsTeaser";
import { CallToVisit } from "@/components/home/CallToVisit";

export const revalidate = 300;

export default async function HomePage() {
  let events: {
    id: string;
    title: string;
    artist: string | null;
    date: Date;
    time: string;
  }[] = [];
  try {
    events = await prisma.event.findMany({
      where: {
        status: "published",
        date: { gte: new Date() },
      },
      orderBy: { date: "asc" },
      take: 3,
      select: { id: true, title: true, artist: true, date: true, time: true },
    });
  } catch (err) {
    // DB might not be ready in build; degrade gracefully
    console.error("[home] events query failed", err);
  }

  return (
    <>
      <Hero />
      <Marquee />
      <TheSpace />
      <Chapters />
      <Drinks />
      <EventsTeaser
        events={events.map((e) => ({
          ...e,
          date: e.date.toISOString(),
        }))}
      />
      <CallToVisit />
    </>
  );
}
