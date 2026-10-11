import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "GrowWise — Grow better, one small step at a time",
    template: "%s | GrowWise"
  },
  description: "Personalized gardening guidance, seasonal planting ideas, and practical weekly care plans powered by open AI.",
  applicationName: "GrowWise",
  keywords: ["gardening planner", "plant care", "vegetable gardening", "AI gardening", "home garden"],
  openGraph: {
    type: "website",
    siteName: "GrowWise",
    title: "GrowWise — Grow better, one small step at a time",
    description: "Make gardening simpler with personalized, practical plant-care plans."
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
