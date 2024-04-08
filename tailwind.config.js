/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#090909",
        module: "#121212",
        "br-module": "#424242",

        card: "#282828",

        "br-button": "#727272",
        "br-button-hover": "#ffffff",

        "tx-button-white": "#e8e8e8",
        "tx-button-black": "#000000",

        "button-gray": "#232323",
        "button-gray-hover": "#2A2A2A",
        "card-gray": "#242424",
        "br-card-gray": "#404040",
        "icon-unselected": "#898989",

        primary: {
          50: "#eef3ff",
          100: "#e0e8ff",
          200: "#c8d4fd",
          300: "#a6b9fb",
          400: "#8392f6",
          500: "#5963ee",
          600: "#4a48e3",
          700: "#3e3ac8",
          800: "#3331a2",
          900: "#2f3080",
          950: "#1d1c4a",
        },
      },
    },
  },
  plugins: [],
};
