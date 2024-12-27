/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ["index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
      },
      colors: {
        "primary": "#041E42",
        "secondary": "#C8102E",
        "white": "#FFFFFF",
        "navbar": "rgb(249 249 249 / 80%)",
      },
      fontFamily: {
        "Figtree": ["Figtree, sans-serif"]
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1020px",
        xl: "1200px",
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      }
    },
  },
  plugins: [],
}