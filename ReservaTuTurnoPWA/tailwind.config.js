/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        rosaclaro: "#fce8f1",
        rosa: "#DA7DA3",
        rosaoscuro: "#BC6484",
        verde: "#32BF8D",
        grisclarito: "#F9F9F9",
        grisclaro: "#9ca3af",
        gris: "#4b5563",
        negro: "#1f2937",
        blanco: "#fefefe",
        rojo: "#dc2626",
      },
    },
  },
  plugins: [],
};
