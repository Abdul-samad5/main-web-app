/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#02A9F7",
        "brand-secondary": "#E07B02",
        "brand-accent": "#53D258",
        "brand-gray": "#A9A9A9",
        "brand-warning": "#E4C65B",
        "brand-error": "#E25C5C",
        "brand-black": "#263131",
        "brand-stroke": "#CACACA",
      },
      fontFamily: {
        futura: [`Futura LT`, "sans-serif"],
      },
    },
  },
  plugins: [],
};
