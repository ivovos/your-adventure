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
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      colors: {
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'background': 'var(--color-background)',
        'background-subtle': 'var(--color-background-subtle)',
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-dark': 'var(--color-accent-dark)',
        'purple': 'var(--color-purple)',
        'blue': 'var(--color-blue)',
        'yellow': 'var(--color-yellow)',
      },
      maxWidth: {
        'reading': 'var(--max-width-reading)',
      },
      spacing: {
        'reading': 'var(--spacing-reading)',
      },
      borderRadius: {
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
    },
  },
  plugins: [],
};
export default config;
