import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Charter', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'sans-serif'],
      },
      colors: {
        'text-primary': '#000000',
        'text-secondary': '#666666',
        'background': '#FFFFFF',
        'background-subtle': '#F7F7F7',
        'accent': '#00D632', // Cash App green
        'accent-hover': '#00BD2A',
        'accent-dark': '#00A023',
        'purple': '#A259FF',
        'blue': '#00D5FF',
        'yellow': '#FFCF00',
      },
      maxWidth: {
        'reading': '680px',
      },
      spacing: {
        'reading': '2rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
};
export default config;
