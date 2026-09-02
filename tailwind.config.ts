import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0E14",
        surface: "#12151A",
        border: "#262B33",
        ink: {
          DEFAULT: "#F5F6F7",
          muted: "#8B92A0",
        },
        accent: {
          DEFAULT: "#39FF14",
          onaccent: "#0A0E14",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        field: "10px",
      },
    },
  },
  plugins: [],
};

export default config;
