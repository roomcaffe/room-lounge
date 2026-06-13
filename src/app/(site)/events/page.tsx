import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { EventsView } from "@/components/events/EventsView";

export const metadata: Metadata = {
  title: "Events",
  description: "Live music, DJ nights dhe netë speciale në Room Lounge.",
};

export const revalidate = 60;

export default async function EventsPage() {
  let events: {
    id: string;
    title: string;
    artist: string | null;
    date: Date;
    time: string;
    coverImage: string | null;
    description: string | null;
  }[] = [];
  try {
    events = await prisma.event.findMany({
      where: { status: "published" },
      orderBy: { date: "asc" },
      select: {
        id: true,
        title: true,
        artist: true,
        date: true,
        time: true,
        coverImage: true,
        description: true,
      },
    });
  } catch (err) {
    console.error("[events] failed", err);
  }

  return (
    <EventsView
      events={events.map((e) => ({ ...e, date: e.date.toISOString() }))}
    />
  );
}
