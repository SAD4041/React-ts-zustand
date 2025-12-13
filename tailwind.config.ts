import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["Vazirmatn", "Roboto"],
      },

      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        sidebar: "hsl(var(--sidebar))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },

        'dropdown-selected-bg': 'hsl(var(--dropdown-selected-bg))',
        'dropdown-selected-border': 'hsl(var(--dropdown-selected-border))',
        'dropdown-hover-bg': 'hsl(var(--dropdown-hover-bg))',
        'header-bg-blur': 'hsl(var(--header-bg-blur))',
        'ring-primary-subtle': 'hsl(var(--ring-primary-subtle))',
      },

      width: {
        sidebar: "300px",
        "sidebar-collapsed": "110px",

        'dropdown-menu': '600px',
        'dropdown-image': '15rem',
        'logo-container': '2.75rem',
        'logo-container-md': '3.375rem',
        'search-input': '15rem',
        'search-input-md': '12rem',
        'search-input-lg': '22.5rem',
      },

      minWidth: {
        'dropdown-menu': '600px',
      },

      maxWidth: {
        'dropdown-menu': '48rem',
      },

      height: {
        sidebar: "100vh",
        'logo-container': '3.5rem',
      },

      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },

    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;