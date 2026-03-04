import type { Metadata } from "next";
import SubdomainLanding from "@/components/SubdomainLanding";

export const metadata: Metadata = {
  title: "mochi",
  description: "mochi by Harsha Chaganti",
};

export default function MochiPage() {
  return (
    <SubdomainLanding
      name="mochi"
      platform="iOS"
      description="A quiet, mindful way to track spending, check patterns, and reflect on habits."
      status="Available now"
      logoSrc="/logos/mochi.jpg.jpeg"
      heroImageSrc="/open-log-close-screen1 (1).png"
      galleryImages={[
        "/open-log-close-screen1 (1).png",
        "/reflection-screen2 (1).png",
        "/history-screen3 (1).png",
        "/widget-screen4 (1).png",
      ]}
      bullets={[
        "Quick daily spend logging with calm, focused flow",
        "Reflection and history views for long-term awareness",
        "Widgets to stay close to your spending rhythm",
        "Built with a minimal iOS-first design language",
      ]}
      ctaUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      ctaLabel="Download"
      ctaHint="Available on the App Store"
    />
  );
}
