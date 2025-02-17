/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
  
    extend: {
      colors: {
        primary: "#fea928",
        secondary: "#ed8900",
      },
      container: {
       
        center: {
          padding: {
            DEFAULT: "1rem",
            sm: "1rem",
          },
        },
      },
    },
  },
  plugins: [],
};
