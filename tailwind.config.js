/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.html",
    "./src/partials/**/*.htm",
    "./src/**/*.js",
    "./src/**/*.scss",
  ],
  darkMode: ["class"],
  safelist: [],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        Inter: ["Inter Tight"],
        Manrope: ["Manrope"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFF",
          100: "#F3F8E8",
          200: "#C4F241",
        },

        paragraph: {
          DEFAULT: "#020500",
        },
      },
      borderRadius: {
        large: "40px",

        DEFAULT: "10px",
      },
      boxShadow: {
        "box-v1": "2.626px 20px 29.177px -3.793px rgba(22, 52, 80, 0.16)",
        "box-v2": "2.626px 7.878px 29.177px -3.793px rgba(22, 52, 80, 0.10)",
        "faq-icon-shadow":
          "0px 0.602px 0.602px -1px rgba(0, 0, 0, 0.07), 0px 2.289px 2.289px -2px rgba(0, 0, 0, 0.07), 0px 10px 10px -3px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        hand: "url('/images/thumbnail/hand.png')",
      },
    },
  },
  safelist: [
    {
      pattern: /scale-/,
    },
  ],
  plugins: [],
};
