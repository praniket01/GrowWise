"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { BookOpen, Download, Leaf, Plus, Search, Trash2 } from "lucide-react";
import { JOURNAL_STORAGE_KEY, type JournalEntry } from "@/lib/garden-features";

const today = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

export function GardenJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [plantName, setPlantName] = useState("");
  const [observedAt, setObservedAt] = useState(today());
  const [health, setHealth] = useState<JournalEntry["health"]>("Okay");
  const [note, setNote] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored) as JournalEntry[]);
    } catch { /* Keep the journal available if old local data is malformed. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  }, [entries, ready]);

  const visibleEntries = useMemo(() => entries.filter((entry) => `${entry.plantName} ${entry.note} ${entry.health}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => b.observedAt.localeCompare(a.observedAt) || b.createdAt.localeCompare(a.createdAt)), [entries, query]);

  function addEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!plantName.trim() || !note.trim()) { setError("Add a plant name and a short observation before saving."); return; }
    const entry: JournalEntry = { id: crypto.randomUUID(), plantName: plantName.trim(), observedAt, health, note: note.trim(), createdAt: new Date().toISOString() };
    setEntries((previous) => [entry, ...previous]);
    setPlantName(""); setNote(""); setHealth("Okay"); setObservedAt(today()); setError("");
  }

  function exportEntries() {
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), app: "GrowWise Garden Journal", entries }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `growwise-journal-${today()}.json`; anchor.click();
    URL.revokeObjectURL(url);
  }

  function deleteEntry(id: string) {
    if (window.confirm("Delete this garden observation? This cannot be undone.")) setEntries((previous) => previous.filter((entry) => entry.id !== id));
  }

  return <section className="container feature-content journal-layout">
    <form className="form-card journal-form" onSubmit={addEntry}>
      <div className="feature-form-heading"><span className="feature-icon"><BookOpen size={22} /></span><div><h2>Add an observation</h2><p>Record what you actually noticed, not just what you changed.</p></div></div>
      <div className="form-grid">
        <div className="field field-full"><label htmlFor="journal-plant">Plant name</label><input id="journal-plant" value={plantName} onChange={(event) => setPlantName(event.target.value)} maxLength={80} placeholder="e.g. balcony tomato" required /></div>
        <div className="field"><label htmlFor="journal-date">Observation date</label><input id="journal-date" type="date" value={observedAt} max={today()} onChange={(event) => setObservedAt(event.target.value)} required /></div>
        <div className="field"><label htmlFor="journal-health">Plant condition</label><select id="journal-health" value={health} onChange={(event) => setHealth(event.target.value as JournalEntry["health"])}><option>Thriving</option><option>Okay</option><option>Needs attention</option></select></div>
        <div className="field field-full"><label htmlFor="journal-note">What did you notice?</label><textarea id="journal-note" rows={5} maxLength={1200} value={note} onChange={(event) => setNote(event.target.value)} placeholder="Leaves look brighter after moving the pot. Soil was still moist below the surface…" required /></div>
        {error && <p className="field-full error-text" role="alert">{error}</p>}
        <div className="field-full"><button className="btn btn-primary" type="submit"><Plus size={17} /> Save observation</button></div>
      </div>
    </form>

    <div className="journal-history">
      <div className="journal-history-heading"><div><span className="eyebrow">Look back to grow forward</span><h2>Your garden timeline</h2><p>{entries.length} {entries.length === 1 ? "observation" : "observations"} recorded</p></div><button className="btn btn-secondary export-btn" onClick={exportEntries} disabled={!entries.length}><Download size={16} /> Export JSON</button></div>
      <label className="journal-search"><Search size={17} /><input aria-label="Search observations" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search plant names or notes" /></label>
      {visibleEntries.length === 0 ? <div className="feature-empty-state journal-empty"><span className="empty-state-icon"><Leaf size={28} /></span><h3>{entries.length ? "No matching observations" : "Your first note starts here"}</h3><p>{entries.length ? "Try another plant name or search term." : "After spending a few minutes with a plant, add one detail you noticed. Your timeline will grow as your garden does."}</p></div> : <div className="journal-timeline">{visibleEntries.map((entry) => <article className="journal-entry" key={entry.id}><span className="timeline-dot" /><div className="journal-entry-head"><div><time dateTime={entry.observedAt}>{new Date(`${entry.observedAt}T12:00:00`).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</time><h3>{entry.plantName}</h3></div><span className={`health-status health-${entry.health.toLowerCase().replaceAll(" ", "-")}`}>{entry.health}</span></div><p>{entry.note}</p><button className="icon-action" type="button" onClick={() => deleteEntry(entry.id)} aria-label={`Delete observation for ${entry.plantName}`}><Trash2 size={16} /> Delete</button></article>)}</div>}
      <p className="local-data-note">Notes are stored in this browser only, not synced to an account or cloud database. Use Export JSON to keep a backup you control.</p>
    </div>
  </section>;
}
