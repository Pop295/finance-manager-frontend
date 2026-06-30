/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff', 100: '#d9e6ff', 200: '#bcd2ff', 300: '#8eb4ff',
          400: '#588cff', 500: '#3366ff', 600: '#1f47f5', 700: '#1836e1',
          800: '#1a30b6', 900: '#1c2f8f'
        }
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,24,40,.04), 0 4px 16px rgba(16,24,40,.06)',
        card: '0 1px 3px rgba(16,24,40,.05), 0 10px 30px rgba(16,24,40,.05)'
      },
      borderRadius: { xl2: '1.25rem' }
    }
  },
  plugins: []
}
