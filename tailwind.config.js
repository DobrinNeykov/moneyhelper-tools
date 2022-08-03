/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: {
          700: "#d00000",
        },
        yellow: {
          200: "#F0F05A",
        },
        gray: {
          100: "#f3f1f3",
          800: "#000b3b",
        },
        purple: {
          700: "#8200D1",
        },
        pink: {
          600: "#c82a87",
          800: "#ae0060",
          900: "#9c0052",
        },
      },
      boxShadow: {
        "bottom-gray": "0px 3px 0px rgba(0, 11, 59, 0.25)",
      },
    },
  },
  plugins: [],
};
