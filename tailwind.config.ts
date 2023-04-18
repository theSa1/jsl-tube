import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f0f",
        "bg-header": "#161515",
        "bg-card": "#252525",
        "text-primary": "#fff",
        "text-secondary": "#aaaaaa",
        "skeleton-primary": "#333",
        sa1: "#4fd1c5",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
} satisfies Config;
