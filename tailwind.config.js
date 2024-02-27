/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#090909",
        module: "#121212",

        "br-module": "#424242",
        primary: "#2f54ca",
      },
    },
  },
  plugins: [],
};
