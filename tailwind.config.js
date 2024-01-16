const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        '3xl': '1920px',
      },
      spacing: {
        4.5: '1.125rem', // 18px
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        body: 'hsl(var(--body))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      height: {
        nav: 'var(--nav-height)',
        player: 'var(--player-height)',
        main: 'calc(100vh - var(--nav-height))',
        minimap: 'calc(100vh - var(--nav-height) - var(--player-height))',
      },
      minWidth: {
        ...defaultTheme.spacing,
        ...defaultTheme.screens,
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '2/3': '66.667%',
        '3/4': '75%',
        '4/5': '80%',
      },
      maxWidth: {
        ...defaultTheme.spacing,
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '2/3': '66.667%',
        '3/4': '75%',
        '4/5': '80%',
      },
      minHeight: {
        ...defaultTheme.spacing,
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '2/3': '66.667%',
        '3/4': '75%',
        '4/5': '80%',
      },
      maxHeight: {
        ...defaultTheme.spacing,
        '1/5': '20%',
        '1/4': '25%',
        '1/3': '33.333%',
        '2/5': '40%',
        '1/2': '50%',
        '3/5': '60%',
        '2/3': '66.667%',
        '3/4': '75%',
        '4/5': '80%',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwindcss-animated'),
    require('tailwind-scrollbar-hide'),
  ],
};
