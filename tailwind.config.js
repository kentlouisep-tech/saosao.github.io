import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
                display: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: '#0f172a',
                    light: '#1e3a8a',
                    dark: '#0f172a',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                    dark: '#D97706',
                },
                secondary: {
                    DEFAULT: '#4a7fc9',
                },
                surface: {
                    DEFAULT: '#ffffff',
                    bg: '#f8fafc',
                    border: '#e2e8f0',
                    muted: '#8896a6',
                    text: '#2d3748',
                    heading: '#0f172a',
                    subdued: '#f8fafc',
                },
                success: '#2e7d4f',
                warning: '#c99a1e',
                danger: '#c0392b',
                info: '#2b7cc9',

                // Retain compatibility mappings
                navy: {
                    DEFAULT: '#112e62',
                    hover: '#1c4088',
                    active: '#0a1d40',
                },
                blue: {
                    DEFAULT: '#4a7fc9',
                    hover: '#1c4088',
                    light: '#eff6ff',
                },
                canvas: '#f8fafc',
                border: {
                    DEFAULT: '#e2e8f0',
                    subtle: '#edf2f9',
                },
                muted: '#8896a6',
                subtle: '#8896a6',
            },
        },
    },

    plugins: [forms],
};
