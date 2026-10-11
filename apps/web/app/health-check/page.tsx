import type { Metadata } from "next";
import { PlantHealthChecker } from "@/components/features/plant-health-checker";

export const metadata: Metadata = {
  title: "Plant Health Investigator",
  description: "Use a guided checklist to investigate common plant symptoms and choose safe next steps."
};

export default function HealthCheckPage() {
  return <>
    <section className="container page-title feature-page-title">
      <span className="eyebrow">🔎 Observe before you treat</span>
      <h1>Be a plant health detective.</h1>
      <p>Work through a few simple observations to explore possible causes and decide what to check next—without pretending one symptom proves a diagnosis.</p>
    </section>
    <PlantHealthChecker />
  </>;
}
