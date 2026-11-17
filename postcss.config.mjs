// Tailwind v4 through PostCSS, as the Next.js 16 docs recommend
// (node_modules/next/dist/docs/01-app/01-getting-started/11-css.md).
// The scaffold's @tailwindcss/turbopack loader served stale CSS in dev.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
