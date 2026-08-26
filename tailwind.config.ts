import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          1: '#0B0B0D',
          2: '#111111',
          3: '#0A0A0F',
          4: '#08090A',
          5: '#0D0907',
          6: '#0C090A',
          7: '#060606',
        },
        slate: {
          deep: '#151922',
        },
        umber: {
          1: '#252321',
          2: '#4D423E',
          3: '#5C352C',
          4: '#956959',
        },
        ink: '#040200',
        gold: {
          1: '#C9A24D',
          2: '#8C6D2F',
          3: '#3A2C13',
        },
        blush: '#B67E7D',
        wine: {
          1: '#640000',
          2: '#420001',
        },
        sand: '#E9B48A',
        ivory: '#EDE6D8',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
