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
        gray: {
          100: "#f3f1f3",
          800: "#000b3b",
        },
        purple: {
          700: "#8200D1",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
