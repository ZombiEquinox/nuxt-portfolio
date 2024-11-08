/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "components/**/*.{vue,js}",
    "pages/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

