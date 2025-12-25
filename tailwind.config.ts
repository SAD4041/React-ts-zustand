import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
  ],

  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    extend: {
      /* ---------- Fonts ---------- */
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
        vazirmatn: ["Vazirmatn", "Roboto"],
      },

      /* ---------- Font Sizes ---------- */
      fontSize: {
        "2xs": "0.625rem",
        "product-title": "0.875rem",
        "product-price": "0.875rem",
        "product-discounted": "0.875rem",
        "product-rating": "0.875rem",
        "product-rating-count": "0.75rem",
        "product-size-label": "0.625rem",
      },

      /* ---------- Spacing ---------- */
      spacing: {
        "product-image-gap": "0.5rem",
        "product-details-gap": "0.75rem",
        "product-size-gap": "0.25rem",
        "product-color-gap": "0.125rem",
      },

      /* ---------- Width ---------- */
      width: {
        "product-card": "220px",
        "product-image": "100%",
        "product-color-dot": "1.625rem",
        "product-tuman-icon": "1.125rem",

        sidebar: "300px",
        "sidebar-collapsed": "110px",
        "dropdown-menu": "600px",
        "dropdown-image": "15rem",
        "logo-container": "2.75rem",
        "logo-container-md": "3.375rem",
        "search-input": "15rem",
        "search-input-md": "12rem",
        "search-input-lg": "22.5rem",
      },

      minWidth: {
        "dropdown-menu": "600px",
      },

      maxWidth: {
        "dropdown-menu": "48rem",
      },

      /* ---------- Height ---------- */
      height: {
        "product-color-dot": "1.625rem",
        "product-tuman-icon": "1.125rem",
        sidebar: "100vh",
        "logo-container": "3.5rem",
      },

      /* ---------- Colors ---------- */
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
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))",
          border: "hsl(var(--primary-border))",
          "border-hover": "hsl(var(--primary-border-hover))",
          light: "hsl(var(--primary-light))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          hover: "hsl(var(--muted-hover))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          hover: "hsl(var(--accent-hover))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        brand: {
          DEFAULT: "hsl(var(--brand))",
          foreground: "hsl(var(--brand-foreground))",
          light: "hsl(var(--brand-light))",
        },

        danger: {
          DEFAULT: "hsl(var(--danger))",
          foreground: "hsl(var(--danger-foreground))",
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

        "dropdown-selected-bg": "hsl(var(--dropdown-selected-bg))",
        "dropdown-selected-border": "hsl(var(--dropdown-selected-border))",
        "dropdown-hover-bg": "hsl(var(--dropdown-hover-bg))",
        "header-bg-blur": "hsl(var(--header-bg-blur))",
        "ring-primary-subtle": "hsl(var(--ring-primary-subtle))",
      },

      /* ---------- Radius ---------- */
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
    },
  },

  plugins: [
    tailwindcssAnimate,
    require("@tailwindcss/line-clamp"),
  ],
};

export default config;