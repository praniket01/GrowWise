import { NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  city: z.string().trim().min(1).max(100),
  space: z.enum(["BALCONY", "WINDOWSILL", "BACKYARD", "COMMUNITY"]),
  sunlight: z.enum(["FULL_SUN", "PARTIAL_SUN", "SHADE", "UNKNOWN"]),
  interests: z.string().max(180).default(""),
  goal: z.enum(["START_GARDEN", "PLANT_CARE", "PESTS", "YELLOW_LEAVES", "WATERING", "SEASONAL_IDEAS", "OTHER"]).default("START_GARDEN"),
  question: z.string().trim().min(3).max(700)
});

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your garden details and question.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const serviceUrl = process.env.AI_SERVICE_URL;
  if (!serviceUrl) {
    return NextResponse.json({
      mode: "fallback",
      message: "The AI service is not configured yet, so this is a basic safety-first checklist rather than a model-generated answer. Configure the FastAPI service and an open-weight model to enable the Garden Coach.",
      suggestions: [
        `Start by observing the plant and its growing conditions in ${parsed.data.city}.`,
        "Check soil moisture and drainage before changing your watering routine.",
        "Photograph or write down visible changes and compare them over a few days; avoid applying treatments based on a guess."
      ]
    });
  }

  try {
    const response = await fetch(`${serviceUrl.replace(/\/$/, "")}/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(25000),
      cache: "no-store"
    });
    if (!response.ok) return NextResponse.json({ error: "The AI service is temporarily unavailable. Check its logs and model endpoint." }, { status: 502 });
    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: "Could not reach the AI service. Start it locally or check AI_SERVICE_URL." }, { status: 503 });
  }
}
