import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{ts,tsx,js,jsx}",
	],
	darkMode: "class",
	theme: {
		screens: {
			'xs': '475px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
    	},
		extend: {
			fontFamily: {
				sans: ["Vazirmatn", 'sans-serif'],
			},
			fontSize: {
			'2xs': '0.625rem',
			'product-title': '0.875rem',   
			'product-price': '0.875rem',   
			'product-discounted': '0.875rem',
			'product-rating': '0.875rem',
			'product-rating-count': '0.75rem', 
			'product-size-label': '0.625rem', 
			},

			width: {
			'product-card': '220px',        
			'product-image': '100%',       
			'product-color-dot': '1.625rem',
			'product-tuman-icon': '1.125rem',
			},

			height: {
			'product-color-dot': '1.625rem',
			'product-tuman-icon': '1.125rem',
			},

			padding: {
			'product-card': '0.5rem',
			},

			spacing: {
			'product-image-gap': '0.5rem', 
			'product-details-gap': '0.75rem', 
			'product-size-gap': '0.25rem', 
			'product-color-gap': '0.125rem',
			},
			colors: {
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
					hover: "hsl(var(--primary-hover))",
					active: "hsl(var(--primary-active))",
					border: "hsl(var(--primary-border))",
					'border-hover': "hsl(var(--primary-border-hover))",
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
			},
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
		require('@tailwindcss/line-clamp'),
	],
};

export default config;
