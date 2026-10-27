/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#F4F6F4',
          100: '#E5EAE6',
          200: '#CBD5CD',
          300: '#A7B8AA',
          400: '#7A967E',
          500: '#49614D', // Primary Brand Color
          600: '#3D5240',
          700: '#324335',
          800: '#28362B',
          900: '#1C251E',
          950: '#101611',
        },
        vermilion: {
          50: '#FEF2F1',
          100: '#FDE2E1',
          200: '#FBCAC7',
          300: '#F7A6A2',
          400: '#F2746E',
          500: '#E83F35', // Accent Red
          600: '#D4271D',
          700: '#B21D14',
          800: '#931B14',
          900: '#7A1D17',
        },
        warm: {
          50: '#FCFBF8',
          100: '#F7F5EF', // Warm White Canvas
          200: '#EFECE1',
          300: '#E4DFD0',
          400: '#D2C9B4',
          500: '#B5A990',
          600: '#93866E',
          700: '#736855',
          800: '#5C5345',
          900: '#3D362C',
        },
        earth: {
          50: '#FAF8F5',
          100: '#F3EFEA',
          200: '#E6E0D7',
          300: '#CFC5B6',
          400: '#AFA18F',
          500: '#8E7E6B',
          600: '#746452',
          700: '#5D4F3F',
          800: '#41382E',
          900: '#241E18',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(73, 97, 77, 0.08)',
        'soft-md': '0 8px 24px -4px rgba(73, 97, 77, 0.10)',
        'soft-lg': '0 16px 36px -6px rgba(73, 97, 77, 0.12)',
        'elevated': '0 20px 40px -15px rgba(28, 37, 30, 0.08)',
      },
    },
  },
  plugins: [],
}
