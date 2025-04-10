import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blackNFM: "#101010",
        whiteNFM: "#FDFDFD",
        greyNFM: "#888888",
        darkGreyNFM: "#404040"
      },
    },
  },
  plugins: [],
} satisfies Config;


