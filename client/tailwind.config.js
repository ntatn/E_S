/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      Poppins: ["Poppins, sans-serif"]
    }
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
}

