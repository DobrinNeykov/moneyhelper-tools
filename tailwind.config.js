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
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
