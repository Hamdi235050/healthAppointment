/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,jsx,tsx}',
    '!./node_modules/**/*' // Exclude node_modules from being processed
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
