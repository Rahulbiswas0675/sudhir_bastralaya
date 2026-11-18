/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        brand: 'var(--color-brand)',
        'brand-secondary': 'var(--color-brand-secondary)',
        gold: 'var(--color-gold)',
        ink: 'var(--color-text)',
        muted: 'var(--color-bg-secondary)',
        surface: 'var(--color-white)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '72rem',
      },
      spacing: {
        section: 'clamp(3.5rem, 8vw, 7rem)',
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
