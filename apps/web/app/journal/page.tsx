import type { Metadata } from "next";
import { GardenJournal } from "@/components/features/garden-journal";

export const metadata: Metadata = {
  title: "Garden Journal",
  description: "Record plant observations, track changes over time, and export your garden notes."
};

export default function JournalPage() {
  return <>
    <section className="container page-title feature-page-title">
      <span className="eyebrow">📔 Your garden has a story</span>
      <h1>Notice more. Remember what works.</h1>
      <p>Keep a simple record of how your plants are doing. Small observations today can help you make better care decisions later.</p>
    </section>
    <GardenJournal />
  </>;
}
