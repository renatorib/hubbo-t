import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@hubbo/react/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "selector",
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};

export default config;
