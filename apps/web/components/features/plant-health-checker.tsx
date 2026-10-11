"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Leaf, ShieldCheck } from "lucide-react";

type Finding = { title: string; confidence: string; why: string; checks: string[]; actions: string[] };

function investigate(symptom: string, soil: string, pattern: string, recent: string): Finding[] {
  const findings: Finding[] = [];
  if (symptom === "yellow") {
    if (soil === "wet") findings.push({ title: "Soil staying too wet", confidence: "Worth checking first", why: "Yellowing combined with persistently wet soil can be consistent with roots getting too little oxygen.", checks: ["Check moisture below the surface, not just the top.", "Confirm the pot has open drainage holes.", "Notice whether several lower leaves or the whole plant are affected."], actions: ["Pause automatic watering and check the plant's specific needs.", "Empty standing water from saucers and keep drainage clear."] });
    if (soil === "dry") findings.push({ title: "Water stress", confidence: "Worth checking first", why: "Yellowing with very dry soil can occur when a plant is not getting enough water, though other causes remain possible.", checks: ["Check whether the root zone is dry, not only the surface.", "Look for wilting or crispy leaf edges.", "Consider how hot or windy the space has been."], actions: ["Water according to the plant's needs and container drainage.", "Recheck soil moisture later rather than following a rigid schedule."] });
    if (pattern === "lower") findings.push({ title: "Older-leaf change or nutrient issue", confidence: "Possible", why: "Some plants naturally shed older leaves; nutrient availability can also affect older foliage. The pattern alone cannot distinguish them.", checks: ["Check whether new growth looks healthy.", "Review recent repotting, feeding and watering history.", "Compare the change with the plant's normal growth cycle."], actions: ["Avoid adding fertilizer until watering and growing conditions have been checked.", "If the pattern spreads, record a photo and re-evaluate in a few days."] });
    if (findings.length === 0) findings.push({ title: "Several causes are possible", confidence: "Needs more observation", why: "Yellow leaves can be associated with water stress, light changes, normal aging, pests, or nutrition issues.", checks: ["Check soil moisture and drainage.", "Inspect both sides of leaves for pests or fine webbing.", "Consider recent changes in light, temperature, or care."], actions: ["Change one care variable at a time.", "Record which leaves are affected and check again in a few days."] });
  } else if (symptom === "spots") {
    findings.push({ title: "Leaf spotting needs closer inspection", confidence: "Possible causes vary", why: "Spots can result from several issues, including leaf wetness, pests, physical damage or disease. A text checklist cannot confirm which one.", checks: ["Note whether spots are dry, soft, raised or surrounded by yellowing.", "Check if new spots appear on more leaves.", "Look for similar symptoms on nearby plants."], actions: ["Avoid wetting foliage unnecessarily and improve gentle airflow.", "Use clean tools and avoid moving potentially affected leaves between plants.", "Seek local horticultural advice if symptoms spread rapidly."] });
  } else if (symptom === "wilting") {
    if (soil === "dry") findings.push({ title: "Possible water shortage", confidence: "Worth checking first", why: "Wilting with dry root-zone soil can indicate the plant needs water, especially after heat or wind.", checks: ["Check moisture around the roots.", "Look for recent heat, wind or missed watering.", "Check whether the container drains properly."], actions: ["Water appropriately for the plant and allow excess water to drain.", "Recheck the plant after conditions stabilize."] });
    else if (soil === "wet") findings.push({ title: "Roots may be struggling in wet soil", confidence: "Worth checking first", why: "A wilted plant in wet soil may be unable to take up water effectively; adding more water can worsen some causes.", checks: ["Confirm that drainage holes are clear.", "Check whether the container is sitting in water.", "Look for stem damage or unusual odors around the root zone."], actions: ["Do not add more water automatically.", "Restore drainage and seek expert advice if decline is rapid or severe."] });
    else findings.push({ title: "Check water, heat and roots", confidence: "Needs more observation", why: "Wilting may follow dry soil, heat stress, root problems or other damage.", checks: ["Feel the soil below the surface.", "Check the plant during cooler parts of the day.", "Inspect the container for drainage issues."], actions: ["Match watering to soil conditions and the plant's needs.", "Avoid making several drastic changes at once."] });
  } else if (symptom === "pests") {
    findings.push({ title: "Look for visible pest evidence", confidence: "Investigation recommended", why: "Leaf holes, sticky residue, webbing and distorted growth can have different causes. Confirm what you see before treating.", checks: ["Inspect leaf undersides, stems and new growth.", "Look for insects, eggs, webbing or sticky residue.", "Check nearby plants for similar signs."], actions: ["If practical, isolate a heavily affected potted plant.", "Start with physical removal or a gentle rinse when appropriate for the plant.", "Identify the pest before choosing a treatment; follow product labels and protect pollinators."] });
  } else {
    findings.push({ title: "Slow growth has several possible causes", confidence: "Needs more observation", why: "Growth can slow because of season, light, temperature, root space, water or nutrition.", checks: ["Compare light exposure with the plant's needs.", "Check soil moisture and drainage.", "Consider the season, pot size and recent changes."], actions: ["Choose one likely factor to check first.", "Avoid adding fertilizer until basic growing conditions are understood.", "Record a baseline and compare new growth over the next week or two."] });
  }
  if (recent === "changed") findings.push({ title: "Recent care or environment change", confidence: "Important context", why: "A recent move, repotting, fertilizer application or change in watering may help explain when symptoms began.", checks: ["Write down what changed and when.", "Compare symptoms before and after the change."], actions: ["Avoid adding more changes at once; observe the response to a careful adjustment."] });
  return findings;
}

export function PlantHealthChecker() {
  const [plant, setPlant] = useState("");
  const [symptom, setSymptom] = useState("yellow");
  const [soil, setSoil] = useState("unknown");
  const [pattern, setPattern] = useState("all");
  const [recent, setRecent] = useState("no");
  const [results, setResults] = useState<Finding[] | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResults(investigate(symptom, soil, pattern, recent));
  }

  const question = `Help me investigate a plant health issue${plant.trim() ? ` on ${plant.trim()}` : ""}. Symptom: ${symptom}; soil moisture: ${soil}; affected leaves: ${pattern}; recent care/environment changes: ${recent}. Give cautious possibilities, explain what to check, and suggest safe next steps without claiming a certain diagnosis.`;
  const coachUrl = `/advisor?question=${encodeURIComponent(question)}`;

  return <section className="container feature-content health-layout">
    <form className="form-card health-form" onSubmit={submit}>
      <div className="feature-form-heading"><span className="feature-icon"><Leaf size={22} /></span><div><h2>What are you noticing?</h2><p>Answer what you can. Unknown is a useful answer too.</p></div></div>
      <div className="form-grid">
        <div className="field field-full"><label htmlFor="health-plant">Plant name (optional)</label><input id="health-plant" value={plant} onChange={(event) => setPlant(event.target.value)} maxLength={80} placeholder="e.g. tomato, basil, pothos" /></div>
        <div className="field field-full"><label htmlFor="health-symptom">Main symptom</label><select id="health-symptom" value={symptom} onChange={(event) => setSymptom(event.target.value)}><option value="yellow">Yellowing leaves</option><option value="spots">Spots or holes on leaves</option><option value="wilting">Wilting or drooping</option><option value="pests">Possible pests or webbing</option><option value="slow">Slow or stunted growth</option></select></div>
        <div className="field"><label htmlFor="health-soil">Soil feels</label><select id="health-soil" value={soil} onChange={(event) => setSoil(event.target.value)}><option value="unknown">Not sure</option><option value="dry">Dry below the surface</option><option value="moist">Slightly moist</option><option value="wet">Very wet / soggy</option></select></div>
        <div className="field"><label htmlFor="health-pattern">Where do you see it?</label><select id="health-pattern" value={pattern} onChange={(event) => setPattern(event.target.value)}><option value="all">Across the plant</option><option value="lower">Mostly older / lower leaves</option><option value="new">Mostly new growth</option><option value="one">One leaf or a few spots</option></select></div>
        <div className="field field-full"><label htmlFor="health-change">Recent change in care or location?</label><select id="health-change" value={recent} onChange={(event) => setRecent(event.target.value)}><option value="no">No known change</option><option value="changed">Yes: moved, repotted, watered differently, or fed</option><option value="unknown">Not sure</option></select></div>
      </div>
      <button className="btn btn-primary health-submit" type="submit">Investigate symptoms <ArrowRight size={17} /></button>
      <p className="form-help">This checklist is educational guidance, not a definitive diagnosis. Do not apply treatments until you have identified the likely cause.</p>
    </form>

    <div className="health-results" aria-live="polite">
      {!results ? <div className="feature-empty-state"><span className="empty-state-icon"><ShieldCheck size={28} /></span><h2>Observe first. Treat second.</h2><p>Choose a symptom and share what you know. You'll get possible explanations, checks that help narrow them down, and safe next steps.</p><ul><li><CheckCircle2 size={17} /> Multiple possible causes, not a guess dressed up as certainty</li><li><CheckCircle2 size={17} /> Simple checks you can do with your plant</li><li><CheckCircle2 size={17} /> Low-risk actions before stronger treatments</li></ul></div> : <>
        <div className="result-topline"><span className="eyebrow">Your investigation</span><span className="mode-pill">Rule-based checklist</span></div>
        <h2>{plant.trim() ? `What to check on your ${plant.trim()}` : "What to check next"}</h2>
        {results.map((finding, index) => <article className="finding-card" key={`${finding.title}-${index}`}><div className="finding-heading"><span className="finding-number">{index + 1}</span><div><h3>{finding.title}</h3><span className="finding-confidence">{finding.confidence}</span></div></div><p>{finding.why}</p><div className="finding-columns"><div><strong>Check this</strong><ul>{finding.checks.map((item) => <li key={item}>{item}</li>)}</ul></div><div><strong>Try this next</strong><ul>{finding.actions.map((item) => <li key={item}>{item}</li>)}</ul></div></div></article>)}
        <div className="health-caution"><CircleAlert size={19} /><p>If symptoms spread quickly, stems collapse, or a plant may have been exposed to a hazardous substance, seek qualified local advice. Keep children and pets away from unknown treatments.</p></div>
        <Link href={coachUrl} className="btn btn-primary health-coach-link">Discuss these observations with AI Coach <ArrowRight size={17} /></Link>
      </>}
    </div>
  </section>;
}
