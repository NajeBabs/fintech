/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "fintech-mint": "#D1FFF0",
        "fintech-dark": "#1F2421",
        primary: "#24DBD8",
      },
    },
  },
  plugins: [],
};
