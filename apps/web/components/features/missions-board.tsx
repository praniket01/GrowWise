"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Clock3, Leaf, Sprout, Target } from "lucide-react";
import { GARDEN_MISSIONS, MISSIONS_STORAGE_KEY, type MissionCompletion } from "@/lib/garden-features";

function localDay(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function MissionsBoard() {
  const [completions, setCompletions] = useState<MissionCompletion[]>([]);
  const [ready, setReady] = useState(false);
  const [reflectionById, setReflectionById] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MISSIONS_STORAGE_KEY);
      if (stored) setCompletions(JSON.parse(stored) as MissionCompletion[]);
    } catch { /* Ignore invalid local browser data and keep the board usable. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(completions));
  }, [completions, ready]);

  const today = localDay(new Date());
  const todayMission = GARDEN_MISSIONS[Math.floor(new Date(`${today}T12:00:00`).getTime() / 86400000) % GARDEN_MISSIONS.length];
  const doneToday = completions.some((item) => localDay(new Date(item.completedAt)) === today);
  const completedIds = new Set(completions.map((item) => item.missionId));
  const filteredMissions = filter === "All" ? GARDEN_MISSIONS : GARDEN_MISSIONS.filter((mission) => mission.category === filter);
  const totalMinutes = useMemo(() => completions.reduce((sum, item) => sum + (GARDEN_MISSIONS.find((mission) => mission.id === item.missionId)?.minutes ?? 0), 0), [completions]);

  function completeMission(missionId: string) {
    if (completions.some((item) => item.missionId === missionId && localDay(new Date(item.completedAt)) === today)) return;
    setCompletions((previous) => [{ missionId, completedAt: new Date().toISOString(), reflection: reflectionById[missionId]?.trim() ?? "" }, ...previous]);
  }

  return <section className="container feature-content">
    <div className="mission-stats">
      <article className="feature-stat"><span className="stat-icon"><Target size={19} /></span><strong>{completions.length}</strong><span>missions completed</span></article>
      <article className="feature-stat"><span className="stat-icon"><Clock3 size={19} /></span><strong>{totalMinutes}</strong><span>minutes outdoors</span></article>
      <article className="feature-stat"><span className="stat-icon"><Leaf size={19} /></span><strong>{doneToday ? "Done" : "Ready"}</strong><span>today's mission</span></article>
    </div>

    <div className="daily-mission-card">
      <div className="daily-mission-copy">
        <span className="pill">TODAY'S SUGGESTED MISSION</span>
        <h2>{todayMission.title}</h2>
        <p>{todayMission.description}</p>
        <div className="mission-meta"><span><Clock3 size={15} /> {todayMission.minutes} min</span><span><Sprout size={15} /> {todayMission.difficulty}</span><span>{todayMission.category}</span></div>
        <Link className="btn btn-secondary" href="#all-missions">Explore all missions ↓</Link>
      </div>
      <div className="mission-illustration" aria-hidden="true"><span className="mission-sun" /><span className="mission-pot" /><span className="mission-stem" /><span className="mission-leaf mission-leaf-a" /><span className="mission-leaf mission-leaf-b" /><span className="mission-leaf mission-leaf-c" /><span className="mission-ground" /></div>
    </div>

    <div className="feature-section-heading" id="all-missions"><div><span className="eyebrow">Pick one small action</span><h2>Your mission list</h2><p>Complete a mission outdoors, then jot down one thing you noticed.</p></div>
      <label className="filter-control">Category <select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Observe</option><option>Care</option><option>Create</option><option>Biodiversity</option></select></label>
    </div>

    <div className="mission-grid">
      {filteredMissions.map((mission) => {
        const completedToday = completions.some((item) => item.missionId === mission.id && localDay(new Date(item.completedAt)) === today);
        const previousCount = completions.filter((item) => item.missionId === mission.id).length;
        return <article className={`mission-card ${completedToday ? "mission-card-complete" : ""}`} key={mission.id}>
          <div className="mission-card-top"><span className="mission-category">{mission.category}</span><span className="mission-time"><Clock3 size={14} /> {mission.minutes}m</span></div>
          <h3>{mission.title}</h3><p>{mission.description}</p>
          <div className="mission-why"><strong>Why it matters</strong><span>{mission.why}</span></div>
          <details className="mission-steps"><summary>Show me the steps</summary><ol>{mission.steps.map((step) => <li key={step}>{step}</li>)}</ol></details>
          <label className="reflection-label" htmlFor={`reflection-${mission.id}`}>What did you notice? (optional)</label>
          <textarea id={`reflection-${mission.id}`} rows={2} maxLength={240} value={reflectionById[mission.id] ?? ""} onChange={(event) => setReflectionById((previous) => ({ ...previous, [mission.id]: event.target.value }))} placeholder="The soil felt damp below the surface…" />
          <div className="mission-card-footer"><span className="mission-history">{previousCount ? `Completed ${previousCount}×` : "A fresh start"}</span><button className={`btn ${completedToday ? "btn-completed" : "btn-primary"}`} onClick={() => completeMission(mission.id)} disabled={completedToday}><Check size={16} /> {completedToday ? "Done today" : "I did this"}</button></div>
        </article>;
      })}
    </div>
    <p className="local-data-note">Your mission history is stored in this browser only. Clearing browser storage will remove it; cloud sync and accounts are not included in this version.</p>
  </section>;
}
