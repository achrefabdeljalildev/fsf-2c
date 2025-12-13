/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const rotateX = plugin(function ({ addUtilities }) {
    addUtilities({
        '.rotate-y-180': {
            transform: 'rotateY(180deg)',
        },
    });
});
module.exports = {
    content: ['./src/**/*.{html,ts}'],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
        },
        extend: {
            colors: {
                meeting: '#db0b2e',
                activity: '#2b8bd9',
                holiday: '#07ba37',
                training: '#757994',
                primary: {
                    DEFAULT: '#016565',
                    light: '#c6e9e9ff',
                    'dark-light': 'rgba(67,97,238,.15)',
                },
                secondary: {
                    DEFAULT: '#104631',
                    light: '#ebe4f7',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                success: {
                    DEFAULT: '#0E8A8A',
                    light: '#CFE8E8',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#FF3E1D',
                    light: '#FFECE8',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#E3BA3A',
                    light: '#E3BA3A',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#e7f7ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                },
                black: {
                    DEFAULT: '#0e1726',
                    light: '#e3e4eb',
                    'dark-light': 'rgba(14,23,38,.15)',
                },
                white: {
                    DEFAULT: '#ffffff',
                    light: '#e0e6ed',
                    dark: '#888ea8',
                },
                gold: {
                    DEFAULT: '#D0B45B',
                    light: '#E3BA3A',
                },
                menuBorder: {
                    DEFAULT: '#EDEFF2',
                },
                green: {
                    DEFAULT: '#0E8A8A',
                    dark: '#56593E',
                },
                yellow: {
                    DEFAULT: '#D0B45B',
                },
                grayBorder: {
                    DEFAULT: '#F2F2F2',
                },
                grayBg: {
                    DEFAULT: '#EEEFE8',
                },
                filter: {
                    DEFAULT: '#f6f8fa',
                },
                greenText: {
                    DEFAULT: '#909567',
                },
                beige: {
                    DEFAULT: '#F5F5F1',
                },
            },
            fontFamily: {
                ibmPlexSansArabic: ['IBM Plex Sans Arabic', 'sans-serif'],
            },
            spacing: {
                4.5: '18px',
                2.5: '10px',
            },
            boxShadow: {
                '3xl': '0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)',
                'action-shadow': ' 0px 2px 5px 0px #26334D08;',
                header: '0px 4px 4px 0px #0000001A',
            },
            borderRadius: {
                2.5: '10px',
            },
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-200px 0' },
                    '100%': { backgroundPosition: '200px 0' },
                },
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite linear',
            },
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-invert-headings':
                            theme('colors.white.dark'),
                        '--tw-prose-invert-links': theme('colors.white.dark'),
                        h1: {
                            fontSize: '40px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h2: {
                            fontSize: '32px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h3: {
                            fontSize: '28px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h4: {
                            fontSize: '24px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h5: {
                            fontSize: '20px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        h6: {
                            fontSize: '16px',
                            marginBottom: '0.5rem',
                            marginTop: 0,
                        },
                        p: { marginBottom: '0.5rem' },
                        li: { margin: 0 },
                        img: { margin: 0 },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/forms')({ strategy: 'class' }),
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar'),
        rotateX,
    ],
};
