/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:{
        'storeImage': 'url("./src/assets/storeImage.jpg")',
        "example":"url('https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2676')",
      },
      colors: {
        primary: {
          100: "#E2E2E2",
          900: "#3C3B3D",
        },
        secondary: {
          100: "#BFBFBE",
          900: "#737373",
        },
      },
      fontFamily: {
        josefin: "'Josefin Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
