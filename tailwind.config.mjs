/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#F59E0B',
          'amber-dark': '#D97706',
          hazard: '#FBBF24',
          chrome: '#E2E8F0',
          dark: '#18181B',
          void: '#09090B',
          slate: '#94A3B8',
        },
      },
      backgroundImage: {
        'hazard-stripes': 'repeating-linear-gradient(45deg, #FBBF24, #FBBF24 10px, #18181B 10px, #18181B 20px)',
      },
    },
  },
  plugins: [],
};
