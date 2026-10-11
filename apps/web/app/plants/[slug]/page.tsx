import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { plants } from "@/lib/plants";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return plants.map((plant) => ({ slug: plant.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const plant = plants.find((item) => item.slug === slug);
  if (!plant) return { title: "Plant not found" };
  return {
    title: `${plant.name} growing guide`,
    description: `${plant.summary} Learn about sunlight, watering, and practical growing considerations for ${plant.name}.`,
    openGraph: {
      title: `${plant.name} growing guide | GrowWise`,
      description: plant.summary,
      type: "article"
    }
  };
}

export default async function PlantDetailPage({ params }: Props) {
  const { slug } = await params;
  const plant = plants.find((item) => item.slug === slug);
  if (!plant) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${plant.name} growing guide`,
    description: plant.summary,
    about: { "@type": "Thing", name: plant.scientificName }
  };

  return (
    <article className="container" style={{ maxWidth: 850 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <section className="page-title">
        <Link href="/plants" className="eyebrow">← Plant library</Link>
        <div style={{ fontSize: "3.5rem", marginTop: 24 }} aria-hidden="true">{plant.emoji}</div>
        <span className="pill">{plant.difficulty}</span>
        <h1>{plant.name}</h1>
        <p><em>{plant.scientificName}</em> · {plant.summary}</p>
      </section>
      <section className="feature-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 28 }}>
        <div className="feature-card"><div className="feature-icon">☀️</div><h3>Sunlight</h3><p>{plant.sunlight}</p></div>
        <div className="feature-card"><div className="feature-icon">💧</div><h3>Watering</h3><p>{plant.watering}</p></div>
      </section>
      <section className="feature-card" style={{ marginBottom: 80 }}>
        <h2>Growing notes</h2>
        <ul style={{ paddingLeft: 20, lineHeight: 1.9, color: "var(--muted)" }}>
          {plant.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
        <p className="form-help">This is general educational information, not a diagnosis. Confirm planting dates and treatments with trusted local horticultural sources.</p>
        <Link href="/planner" className="btn btn-primary" style={{ marginTop: 14 }}>Plan my garden ↗</Link>
      </section>
    </article>
  );
}
