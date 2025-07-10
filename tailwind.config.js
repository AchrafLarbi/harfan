/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#3D4D9C",
        },
        secondary: {
          100: "#BBA066",
        },
      },
    },
  },
  plugins: [],
};
