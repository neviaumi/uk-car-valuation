import tailwindConfig from '@busybox/react-components/tailwind-config';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{ts,tsx}',
    './cypress/**/*.{ts,tsx}',
    './node_modules/@busybox/react-components/dist/*.js',
  ],
  presets: [tailwindConfig],
};

export default config;
