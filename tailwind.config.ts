import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F2A3D",
          forest: "#13321F",
          green: "#1E7A34",
          "green-dark": "#145C26",
          emerald: "#1FA454",
          teal: "#0E6E6E",
          blue: "#1D4E89",
          surface: "#F6F8F7",
          dark: "#0B1F2B",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.08)",
        float: "0 8px 24px rgba(16,24,40,0.12)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
