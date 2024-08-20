import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '767px'},
      'md': {'min': '768px','max': '1023px'},
      'lg': {'min':'1024px'}
    },
    extend: {
      colors: {
        primary: "#00712D",
        secondary: "#D5ED9F",
        tertiary: "#FFFBE6",
        rare:'#FF9100',
        darkBg: '#000000',
        darkS: '#1E5128',
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
    },
    backdropBlur: {
      'none': '0',
      'sm': '4px',
      DEFAULT: '8px',
      'md': '12px',
      'lg': '16px',
      'xl': '24px',
      '2xl': '40px',
      '3xl': '64px',
    }
  },
  plugins: [],
};
export default config;
