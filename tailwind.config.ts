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
    extend: {
      // فونت‌ها
      fontFamily: {
        sans: ['"Vazirmatn"', "sans-serif"],
        vazirmatn: ['"Vazirmatn"', "Roboto", "sans-serif"],
      },

      // رنگ‌ها
      colors: {
        orangey: "#FE621F",

        // رنگ‌های CSS Variable (از shadcn/ui)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      // شعاع گوشه‌ها
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },

      // حداکثر عرض (مثل فیگما: 1280px)
      maxWidth: {
        "7xl": "80rem", // 1280px
      },
    },
  },

  plugins: [
    tailwindcssAnimate,

    // یوتیلیتی سفارشی: tight-digits
    function ({ addUtilities }: any) {
      addUtilities({
        ".tight-digits": {
          "font-family": '"V Fatehirmatn", sans-serif',
          "letter-spacing": "-0.025em",
          "font-variant-numeric": "tabular-nums",
        },
      });
    },
  ],
};

export default config;