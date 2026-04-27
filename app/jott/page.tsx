import type { Metadata } from "next";
import JottLanding from "@/components/JottLanding";
import "./jott.css";

export const metadata: Metadata = {
  title: "jott",
  description: "jott by Harsha Chaganti",
  icons: {
    icon: "/favicons/jott-rounded.png",
    shortcut: "/favicons/jott-rounded.png",
    apple: "/favicons/jott-rounded.png",
  },
};

export default function JottPage() {
  return <JottLanding />;
}
