import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class', // bật dark mode

    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
            },
        },
    },

    plugins: [],
};

export default config;