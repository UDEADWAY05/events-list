import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*"
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                primary: {
                    superlight: '#FFFFFF',
                    light: '#FFF8F0',
                    DEFAULT: '#FFEBD1',
                    dark: '#978F85',
                },
                secondary: {
                    light: '#EFEFEF',
                    DEFAULT: '#A0A0A0',
                    dark: '#26221D',
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        // ...
    ],
};
export default config;
