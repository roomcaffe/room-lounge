import { Metadata } from "next";
import { StoryView } from "@/components/story/StoryView";

export const metadata: Metadata = {
  title: "Story",
  description:
    "Mbi 19 vite në Lipjan. Historia jonë në kapituj — nga coffee shop i thjeshtë te lounge premium.",
};

export default function StoryPage() {
  return <StoryView />;
}
