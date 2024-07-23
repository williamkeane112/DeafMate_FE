/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Main: "#F7F9FC",
        ButtonBG: "#2573D5",
      },
      textColor: {
        Main: "#29304D",
      },
      fontFamily: {
        pRegular: ["Poppins-Regular"],
      }
    },
  },
  plugins: [],
};
