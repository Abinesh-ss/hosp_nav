import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",     // optional (if exists)
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",     // optional
    "./**/*.{ts,tsx}",                      // ensures full coverage
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(99 102 241)",        // same as your project
        'purple-600': 'rgb(124 58 237)',
      },
    },
  },
  plugins: [],
};

export default config;

