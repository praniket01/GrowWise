import type { Metadata } from "next";
import { GardenCoach } from "@/components/garden-coach";

export const metadata: Metadata = {
  title: "AI Garden Coach",
  description: "Ask GrowWise's AI Garden Coach for practical plant-care steps, beginner gardening guidance, and cautious troubleshooting powered by an open-weight model."
};

export default function AdvisorPage() {
  return (
    <>
      <section className="container page-title">
        <span className="eyebrow">✦ Open AI · Real-world growing</span>
        <h1>Meet your Garden Coach.</h1>
        <p>Ask a gardening question and get a short, practical next step. The coach is designed to help you observe your garden, not keep you stuck in a chat.</p>
      </section>
      <GardenCoach />
    </>
  );
}
