/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'usb-orange': '#F57C00',
        'usb-orange-light': '#FFA45B',
        'usb-tan': '#C9A27A',
        'usb-gray-bg': '#F0F0F0',
        'usb-gray-input': '#ECECEC',
        'usb-dark': '#333333',
        'usb-text-gray': '#666666',
        'usb-blue-link': '#1E40AF',
        'usb-blue-highlight': '#87CEEB',
      },
      fontFamily: {
        'serif-title': ['Georgia', 'Times New Roman', 'serif'],
        'body': ['system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
