import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: {
          50: "#FAFAF7",
          100: "#F5F3EE",
          200: "#EDE9E1",
          300: "#DDD8CD",
          400: "#C8C1B4",
        },
        ink: {
          100: "#9A9590",
          200: "#6B6560",
          900: "#1C1C1C",
        },
      },
      keyframes: {
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeSlideIn 0.4s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
