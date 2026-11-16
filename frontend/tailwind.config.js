/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          900: '#0a0f1d',
          800: '#111827',
          700: '#1f2937',
        }
      }
    },
  },
  plugins: [],
}