/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff5ff",
          100: "#dce8fd",
          200: "#c1d7fc",
          300: "#96bffa",
          400: "#649cf6",
          500: "#4078f1",
          600: "#2d5be6",
          700: "#2245d3",
          800: "#2239ab",
          900: "#213487",
          950: "#192252",
        },
        "button-gray": "#232323",
        "button-gray-hover": "#2A2A2A",
        "gray-back": "#121212",
        "icon-unselected": "#898989",
      },
    },
  },
  plugins: [],
};
