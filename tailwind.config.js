/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        navbar: ["Roboto", "sans-serif"],
      },
      fontFamily: {
        custom: ['Inter', 'sans-serif'],
      },
      fontFamily: {
        title: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
