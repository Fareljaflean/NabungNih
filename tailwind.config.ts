import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#08734F",
        background: "#F5F7F3",
        danger: "#B83232",
        warning: "#8A5700",
        ink: "#17271F",
        muted: "#64736A",
        line: "#DCE4DD",
        paper: "#F5F7F3",
      },
    },
  },
  plugins: [],
};

export default config;
