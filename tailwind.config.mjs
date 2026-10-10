/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          amber: '#F59E0B',
          'amber-hover': '#D97706',
          hazard: '#FBBF24',
          // Grey & Metallic Chrome Spectrum
          chrome: '#F8FAFC',
          silver: '#E2E8F0',
          metal: '#CBD5E1',
          steel: '#94A3B8',
          chassis: '#475569',
          plate: '#1E293B',
          dark: '#18181B',
          void: '#09090B',
        },
      },
      backgroundImage: {
        'hazard-stripes': 'repeating-linear-gradient(45deg, #F59E0B, #F59E0B 10px, #18181B 10px, #18181B 20px)',
        'metal-gradient': 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 35%, #94A3B8 55%, #CBD5E1 70%, #F8FAFC 100%)',
      },
    },
  },
  plugins: [],
};