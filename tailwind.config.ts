// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 6s ease-in-out infinite',
        heartBeat: 'heartBeat 1.5s infinite',
        fadeIn: 'fadeIn 1s ease-out',
        slideUp: 'slideUp 1s ease-out',
      },
    },
  },
  plugins: [],
}