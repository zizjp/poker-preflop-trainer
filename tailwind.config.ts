import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        poker: {
          green: "#0D5C3D",
          red: "#DC2626",
          blue: "#2563EB",
          gold: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
export default config;