/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#090909",
        module: "#121212",
        "br-module": "#424242",

        "button-gray": "#232323",
        "button-gray-hover": "#2A2A2A",
        "gray-back": "#121212",
        "icon-unselected": "#898989",

        primary: {
          50: "#fef9ee",
          100: "#fcf2d8",
          200: "#f8e0b0",
          300: "#f3c97e",
          400: "#eda84a",
          500: "#e88e26",
          600: "#d9751d",
          700: "#b45a1a",
          800: "#90481c",
          900: "#743c1a",
          950: "#3f1e0b",
        },
      },
    },
  },
  plugins: [],
};
