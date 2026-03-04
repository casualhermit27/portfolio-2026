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
      tagline="A mindful journaling app."
      status="Available now"
    />
  );
}
