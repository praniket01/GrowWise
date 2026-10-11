"use client";

import { FormEvent, useEffect, useState } from "react";

type Goal = "START_GARDEN" | "PLANT_CARE" | "PESTS" | "YELLOW_LEAVES" | "WATERING" | "SEASONAL_IDEAS" | "OTHER";
type Result = { mode: "model" | "fallback"; message: string; suggestions: string[] };

const quickQuestions: { label: string; goal: Goal; question: string }[] = [
  { label: "Yellow leaves", goal: "YELLOW_LEAVES", question: "My plant's leaves are turning yellow. What should I inspect first before trying a treatment?" },
  { label: "Possible pests", goal: "PESTS", question: "I noticed tiny insects on a few leaves. How can I identify what they might be and take low-risk first steps?" },
  { label: "Watering help", goal: "WATERING", question: "How can I tell whether my plant needs water instead of following a fixed daily schedule?" },
  { label: "Start growing", goal: "START_GARDEN", question: "Suggest a simple beginner-friendly way to start growing herbs or vegetables in my available space." }
];

export function GardenCoach() {
  const [city, setCity] = useState("");
  const [space, setSpace] = useState("BALCONY");
  const [sunlight, setSunlight] = useState("PARTIAL_SUN");
  const [interests, setInterests] = useState("tomato, coriander, chilli");
  const [goal, setGoal] = useState<Goal>("START_GARDEN");
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuestion = params.get("question");
    if (initialQuestion) {
      setQuestion(initialQuestion.slice(0, 700));
      setGoal("PLANT_CARE");
    }
  }, []);

  async function ask(e?: FormEvent<HTMLFormElement>, preset?: { goal: Goal; question: string }) {
    e?.preventDefault();
    const selectedQuestion = preset?.question ?? question;
    const selectedGoal = preset?.goal ?? goal;
    if (!city.trim()) { setError("Add your city or region so the coach has some context."); return; }
    if (selectedQuestion.trim().length < 3) { setError("Write a gardening question first."); return; }
    setError(""); setResult(null); setLoading(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: city.trim(), space, sunlight, interests, goal: selectedGoal, question: selectedQuestion.trim() })
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "The Garden Coach could not answer right now.");
      setResult(body as Result);
      setQuestion(selectedQuestion);
      setGoal(selectedGoal);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <section className="container coach-layout">
      <form className="form-card coach-form" onSubmit={(e) => ask(e)}>
        <div className="coach-form-heading"><span className="feature-icon">✳</span><div><h2>Your garden context</h2><p>Share only what helps answer your question.</p></div></div>
        <div className="form-grid">
          <div className="field field-full"><label htmlFor="coach-city">City or region</label><input id="coach-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Pune, Maharashtra" maxLength={100} required /></div>
          <div className="field"><label htmlFor="coach-space">Growing space</label><select id="coach-space" value={space} onChange={(e) => setSpace(e.target.value)}><option value="BALCONY">Balcony / terrace</option><option value="WINDOWSILL">Windowsill</option><option value="BACKYARD">Backyard / garden bed</option><option value="COMMUNITY">Community garden</option></select></div>
          <div className="field"><label htmlFor="coach-sun">Sunlight</label><select id="coach-sun" value={sunlight} onChange={(e) => setSunlight(e.target.value)}><option value="FULL_SUN">Full sun</option><option value="PARTIAL_SUN">Partial sun</option><option value="SHADE">Mostly shade</option><option value="UNKNOWN">Not sure</option></select></div>
          <div className="field field-full"><label htmlFor="coach-plants">Plants you grow or want to grow</label><input id="coach-plants" value={interests} onChange={(e) => setInterests(e.target.value)} maxLength={180} placeholder="e.g. mint, basil, tomatoes" /></div>
          <div className="field field-full"><label htmlFor="coach-goal">What do you need help with?</label><select id="coach-goal" value={goal} onChange={(e) => setGoal(e.target.value as Goal)}><option value="START_GARDEN">Starting a garden</option><option value="PLANT_CARE">General plant care</option><option value="YELLOW_LEAVES">Yellowing leaves</option><option value="PESTS">Possible pests</option><option value="WATERING">Watering</option><option value="SEASONAL_IDEAS">Seasonal ideas</option><option value="OTHER">Something else</option></select></div>
          <div className="field field-full"><label htmlFor="coach-question">Your question</label><textarea id="coach-question" rows={4} value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={700} placeholder="Tell the coach what you're seeing or hoping to grow…" required /></div>
          {error && <p className="field-full error-text" role="alert">{error}</p>}
          <div className="field-full"><button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Thinking through your garden…" : "Ask Garden Coach ↗"}</button><p className="form-help" style={{ marginTop: 12 }}>Your question is sent to the configured AI service. If no model is configured, the app clearly labels its fallback checklist.</p></div>
        </div>
      </form>

      <div className="coach-results">
        <div className="coach-panel">
          <span className="eyebrow">A good question to start with</span>
          <h2>What are you noticing today?</h2>
          <p>Pick a prompt to fill in a practical question. Add your city and ask the coach when you're ready.</p>
          <div className="quick-prompts">{quickQuestions.map((item) => <button type="button" key={item.label} className="quick-prompt" onClick={() => { setGoal(item.goal); setQuestion(item.question); setError(""); }}>{item.label}<span aria-hidden="true">↗</span></button>)}</div>
        </div>
        {loading && <div className="coach-panel loading-panel" role="status"><div className="loading-dot"/><h3>Thinking it through…</h3><p>Preparing a practical answer. Model speed depends on the inference hardware and model you configured.</p></div>}
        {result && !loading && <div className="coach-panel result-panel" aria-live="polite"><div className="result-heading"><span className="eyebrow">Your garden action plan</span><span className={`mode-pill ${result.mode === "model" ? "mode-ai" : ""}`}>{result.mode === "model" ? "Open model response" : "Fallback guidance"}</span></div><h2>Here's where to start.</h2><p className="result-message">{result.message}</p><ol className="suggestion-list">{result.suggestions.map((suggestion, i) => <li key={`${i}-${suggestion}`}><span>{String(i + 1).padStart(2, "0")}</span><p>{suggestion}</p></li>)}</ol><div className="outside-nudge">🌿 <div><strong>Now, take it outside.</strong><p>Try the first step with your actual plant, observe what changes, and come back with those observations if you need to refine the plan.</p></div></div><p className="form-help">AI output can be wrong. This is general educational guidance, not a definitive diagnosis. Confirm local planting dates with trusted regional sources and avoid treatment based on a guess.</p></div>}
        {!result && !loading && <div className="coach-panel privacy-panel"><span className="feature-icon">🔓</span><h3>Open AI, your choice</h3><p>Connect a compatible local inference server to keep prompts on your own machine, or configure a provider endpoint. Swap supported models without rewriting the garden experience.</p><p className="form-help">The project does not bundle model weights. Model license, hardware requirements, and endpoint privacy depend on your selected runtime/provider.</p></div>}
      </div>
    </section>
  );
}
