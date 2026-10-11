"use client";

import { FormEvent, useMemo, useState } from "react";
import { buildCarePlan, GardenInput, CareTask } from "@/lib/care-plan";

export function PlannerForm() {
  const [garden, setGarden] = useState<GardenInput>({
    name: "My first garden",
    city: "",
    space: "BALCONY",
    sunlight: "PARTIAL_SUN",
    experience: "BEGINNER",
    interests: "tomato, coriander, chilli"
  });
  const [tasks, setTasks] = useState<CareTask[] | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [error, setError] = useState("");

  const completedCount = useMemo(() => done.length, [done]);

  function update<K extends keyof GardenInput>(key: K, value: GardenInput[K]) {
    setGarden((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!garden.city.trim()) {
      setError("Please enter your city or region so the plan has a useful location context.");
      return;
    }
    setError("");
    setTasks(buildCarePlan(garden));
    setDone([]);
  }

  return (
    <section className="container">
      <form className="form-card" onSubmit={submit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="gardenName">Garden name</label>
            <input id="gardenName" value={garden.name} onChange={(e) => update("name", e.target.value)} maxLength={60} required />
          </div>
          <div className="field">
            <label htmlFor="city">City or region</label>
            <input id="city" value={garden.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Pune, Maharashtra" maxLength={100} required />
          </div>
          <div className="field">
            <label htmlFor="space">Growing space</label>
            <select id="space" value={garden.space} onChange={(e) => update("space", e.target.value as GardenInput["space"])}>
              <option value="BALCONY">Balcony / terrace</option>
              <option value="WINDOWSILL">Windowsill</option>
              <option value="BACKYARD">Backyard / garden bed</option>
              <option value="COMMUNITY">Community garden</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="sunlight">Daily sunlight</label>
            <select id="sunlight" value={garden.sunlight} onChange={(e) => update("sunlight", e.target.value as GardenInput["sunlight"])}>
              <option value="FULL_SUN">Full sun (about 6+ hours)</option>
              <option value="PARTIAL_SUN">Partial sun (about 3–6 hours)</option>
              <option value="SHADE">Mostly shade (under 3 hours)</option>
              <option value="UNKNOWN">Not sure yet</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="experience">Gardening experience</label>
            <select id="experience" value={garden.experience} onChange={(e) => update("experience", e.target.value as GardenInput["experience"])}>
              <option value="BEGINNER">I'm just starting</option>
              <option value="SOME">I've grown a few plants</option>
              <option value="EXPERIENCED">I have gardening experience</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="interests">Plants you are interested in</label>
            <input id="interests" value={garden.interests} onChange={(e) => update("interests", e.target.value)} placeholder="tomato, basil, coriander" maxLength={180} />
          </div>
          <div className="field field-full">
            <p className="form-help">Your information stays in this browser in this prototype. The first plan uses transparent starter rules, not a live AI model. Location-specific planting windows will require a verified local data source.</p>
          </div>
          {error && <p className="field-full" role="alert" style={{ color: "#b42318" }}>{error}</p>}
          <div className="field-full">
            <button className="btn btn-primary" type="submit">Create my starter plan ↗</button>
          </div>
        </div>
      </form>

      {tasks && (
        <div style={{ maxWidth: 760, margin: "0 auto 80px" }} aria-live="polite">
          <div className="section-heading">
            <span className="eyebrow">Your starter plan · {garden.city}</span>
            <h2>{garden.name}</h2>
            <p>{completedCount} of {tasks.length} tasks completed. Use these checks as a starting point and adjust them to your plants and local conditions.</p>
          </div>
          <div className="plan-list">
            {tasks.map((task) => {
              const isDone = done.includes(task.id);
              return (
                <label className={`task ${isDone ? "done" : ""}`} key={task.id}>
                  <input type="checkbox" checked={isDone} onChange={() => setDone((current) => isDone ? current.filter((id) => id !== task.id) : [...current, task.id])} />
                  <div><h3>{task.title}</h3><p>{task.description}</p></div>
                </label>
              );
            })}
          </div>
          <p className="form-help" style={{ marginTop: 18 }}>Care plans are general educational guidance, not a diagnosis. Check soil moisture and local conditions before watering or treating plants.</p>
        </div>
      )}
    </section>
  );
}
