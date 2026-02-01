/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tonal: {
          100: '#ffffff',
          200: '#E9E6D9',
          300: '#c1beb3',
          400: '#9a988f',
          500: '#74736c',
          600: '#51504b',
          700: '#31302d',
          800: '#121110',
          900: '#000000',
        },
        primary: {
          100: '#ffffff',
          200: '#E9D9DC',
          300: '#D2ACB3',
          400: '#BE7D8C',
          500: '#985867',
          600: '#693B46',
          700: '#3e2027',
          800: '#1c0c10',
          900: '#000000',
        },
        success: {
          DEFAULT: '#4caf50',
          light: '#e8f5e9',
          dark: '#388e3c',
        },
        error: {
          DEFAULT: '#f44336',
          light: '#ffebee',
          dark: '#d32f2f',
        },
        warning: {
          DEFAULT: '#ff9800',
          light: '#fff3e0',
          dark: '#f57c00',
        },
        info: {
          DEFAULT: '#2196f3',
          light: '#e3f2fd',
          dark: '#1976d2',
        },
      },
      fontFamily: {
        'heading-cursive': ['Playwrite Australia Tasmania', 'cursive'],
        'heading-chunky': ['Titan One', 'system-ui', 'sans-serif'],
        body: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
