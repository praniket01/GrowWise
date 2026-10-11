import type { Metadata } from "next";
import Link from "next/link";
import { plants } from "@/lib/plants";

export const metadata: Metadata = {
  title: "Plant library",
  description: "Explore beginner-friendly plant profiles and learn about sunlight, watering, and growing considerations."
};

export default function PlantsPage() {
  return (
    <>
      <section className="container page-title">
        <span className="eyebrow">🌿 Learn before you grow</span>
        <h1>A little plant knowledge goes a long way.</h1>
        <p>Browse starter plant profiles. Growing requirements vary by cultivar, season, and local climate, so use these as an introduction and verify regional advice.</p>
      </section>
      <section className="container plant-grid">
        {plants.map((plant) => (
          <article className="plant-card" key={plant.slug}>
            <div className="emoji" aria-hidden="true">{plant.emoji}</div>
            <span className="pill">{plant.difficulty}</span>
            <h2><Link href={`/plants/${plant.slug}`}>{plant.name}</Link></h2>
            <p>{plant.summary}</p>
            <Link href={`/plants/${plant.slug}`} className="eyebrow">Read plant guide ↗</Link>
          </article>
        ))}
      </section>
    </>
  );
}
