import type { Metadata } from "next";
import { MissionsBoard } from "@/components/features/missions-board";

export const metadata: Metadata = {
  title: "Touch Grass Missions",
  description: "Turn gardening advice into small, real-world outdoor missions and build a habit of noticing your garden."
};

export default function MissionsPage() {
  return <>
    <section className="container page-title feature-page-title">
      <span className="eyebrow">🌿 Touch grass, grow something</span>
      <h1>Small missions. Real-world growth.</h1>
      <p>Choose a tiny gardening action, step away from the screen, and learn by noticing. Your progress is saved in this browser.</p>
    </section>
    <MissionsBoard />
  </>;
}
