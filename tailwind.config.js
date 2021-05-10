module.exports = {
  purge: {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: {
        standard: [/^grid-rows/, /^grid-cols/],
      },
    },
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        twitch: {
          primary: '#9147ff',
          light: '#f7f7f8',
          dark: '#0e0e10',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}
