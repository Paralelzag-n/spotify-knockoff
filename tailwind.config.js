/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fca438",
        "button-gray": "#232323",
        "button-gray-hover": "#2A2A2A",
      },
    },
  },
  plugins: [],
};
