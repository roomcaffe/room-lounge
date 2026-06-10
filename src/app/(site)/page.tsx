import { Hero } from "@/components/site/Hero";
import { StoryStrip } from "@/components/site/StoryStrip";
import { BrandStory } from "@/components/site/BrandStory";
import { FeaturedDrinks } from "@/components/site/FeaturedDrinks";
import { EventsPreview } from "@/components/site/EventsPreview";
import { GalleryPreview } from "@/components/site/GalleryPreview";
import { LocationCTA } from "@/components/site/LocationCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryStrip />
      <BrandStory />
      <FeaturedDrinks />
      <EventsPreview />
      <GalleryPreview />
      <LocationCTA />
    </>
  );
}
