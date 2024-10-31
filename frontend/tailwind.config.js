/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#041E42",
        "secondary": "#C8102E",
        "white": "#FFFFFF",
      },
      fontFamily: {
        "Roboto": ["Roboto, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
}