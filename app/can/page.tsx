import type { Metadata } from "next";
import CanLanding from "@/components/CanLanding";

export const metadata: Metadata = {
  title: "can",
  description: "can by Harsha Chaganti",
  icons: {
    icon: "/favicons/can-rounded.png",
    shortcut: "/favicons/can-rounded.png",
    apple: "/favicons/can-rounded.png",
  },
};

export default function CanPage() {
  return <CanLanding />;
}
