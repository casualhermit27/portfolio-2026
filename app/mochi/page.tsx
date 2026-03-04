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
      description="A quiet, mindful way to track spending and reflect on your habits."
      status="Available now"
      logoSrc="/logos/mochi.jpg.jpeg"
      storeUrl="https://apps.apple.com/us/app/mochi-spent-tracker/id6758880826"
      storeLabel="View on App Store"
    />
  );
}
