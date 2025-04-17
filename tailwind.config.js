/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-teal': '#dcf5fc',
        'custom-teal2': '#0ebff0',
        'custom-teal3': '#b6ebfa',
        'pie-c1': '#5C6BC0',
        'pie-c2': '#AB47BC',
        'pie-c3': '#F06292',
      },
    },
  },
  plugins: [],
};


