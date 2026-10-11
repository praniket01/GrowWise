import type { Metadata } from "next";
import { PlannerForm } from "@/components/planner-form";

export const metadata: Metadata = {
  title: "Create your garden plan",
  description: "Create a personalized starter garden plan based on your location, sunlight, and available growing space."
};

export default function PlannerPage() {
  return (
    <>
      <section className="container page-title">
        <span className="eyebrow">🌱 Your starting point</span>
        <h1>Let's meet your garden.</h1>
        <p>Tell us a little about your space. We'll create a practical starter plan you can adjust as you learn more about your plants.</p>
      </section>
      <PlannerForm />
    </>
  );
}
