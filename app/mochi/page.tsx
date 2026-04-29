import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "mochi",
  description: "mochi by Harsha Chaganti",
  icons: {
    icon: "/favicons/mochi-rounded.png",
    shortcut: "/favicons/mochi-rounded.png",
    apple: "/favicons/mochi-rounded.png",
  },
};

export default function MochiPage() {
  return (
    <SubdomainLanding
      name="mochi"
      platform="iOS"
      tagline="Mindful spending, without the noise."
      description="A quiet, mindful way to track spending, check patterns, and reflect on habits."
      logoSrc="/logos/mochi.jpg.jpeg"
      versionLabel="v2.0"
      screens={[
        "/open-log-close-screen1 (1).png",
        "/mochi-insights-2.png",
        "/reflection-screen2 (1).png",
        "/ocr-screen3.png",
        "/history-screen3 (1).png",
        "/widget-screen4 (1).png",
      ]}
      bullets={[
        "Log expenses in **under two taps** with a calm daily flow",
        "Set up **recurring payments** for subscriptions, bills, and repeat expenses",
        "Refined **analytics and insights** make spending patterns easier to understand",
        "Search and filter History to find **past expenses faster**",
        "Minimal interface designed for **clarity**, not noise",
        "**Private by default** with a focused single-user experience",
        "Built to feel **light and fast** across everyday iPhone use",
      ]}
      latestDate="April 29, 2026"
      latestDateIso="2026-04-29"
      changelogTitle="Mochi 2.0"
      changelogSubtitle="A major refinement of the app."
      changelog={[
        {
          title: "Recurring expenses",
          body: "Plan repeating costs and keep recurring spending visible.",
        },
        {
          title: "Refined insights and analytics",
          body: "A clearer view of what you spend, where it goes, and how patterns change over time.",
        },
        {
          title: "Better History search and filtering",
          body: "Find past expenses faster with improved search and cleaner filters.",
        },
        {
          title: "Cleaner settings and membership screens",
          body: "Settings and membership flows have been simplified and polished.",
        },
        {
          title: "Improved visual polish",
          body: "Animations, spacing, and interaction details have been refined across the app.",
        },
        {
          title: "Bug fixes and performance improvements",
          body: "General stability and performance improvements throughout Mochi.",
        },
      ]}
      ctaUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      ctaLabel="Download"
      ctaHint="Available on the App Store"
      noCard
    />
  );
}
