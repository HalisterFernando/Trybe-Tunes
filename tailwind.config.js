module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'r-orange': '#ed6a40',
        'r-cream': '#e5d2b4',
        'r-purple': '#8c6373',
        'r-dark': '#522641',
      },
      fontFamily: {
        cursive: ['Lobster', 'cursive'],
      },
      textShadow: {
        h1: '2px 2px 2px #522641',
        span: '1px 1px 1px #522641',
        link: '0px 1px white',
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require('tailwindcss-textshadow')],
};
