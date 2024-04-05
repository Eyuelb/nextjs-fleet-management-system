import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
    "./public/**/*.svg",
  ],
  theme: {},
  plugins: [],
} satisfies Config;
