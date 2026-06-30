import type { Config } from "tailwindcss";
import tokens from "./spec/design-tokens.json"; // fonte da verdade do design

// O design system manda. Nada de cor/spacing "magico" fora dos tokens.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: tokens.radii,
      boxShadow: tokens.shadows,
      fontFamily: tokens.fonts,
      spacing: tokens.spacing,
    },
  },
  plugins: [],
};
export default config;
