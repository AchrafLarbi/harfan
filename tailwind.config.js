/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        100: "#3D4D9C",
      },
      secondary: {
        100: "#BBA066",
      },
    },
    fontFamily: {
      sans: ["IBM Plex Sans Arabic", "sans-serif"],
    },
  },
};
export const plugins = [];
