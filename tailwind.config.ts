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
		extend: {
			fontFamily: {
				sans: ["Vazirmatn", 'sans-serif'],
			},
			fontSize: {
				'xs': 'var(--text-xs)',
				'sm': 'var(--text-sm)',
				'base': 'var(--text-base)',
				'lg': 'var(--text-lg)',
				'xl': 'var(--text-xl)',
				'2xl': 'var(--text-2xl)',
			},
			spacing: {
				'section': 'var(--spacing-section)',
				'component': 'var(--spacing-component)',
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
				// Brand Profile Colors
				brand: {
					badge: {
						bg: "hsl(var(--brand-badge-bg))",
						text: "hsl(var(--brand-badge-text))",
					},
					official: {
						bg: "hsl(var(--brand-official-bg))",
						text: "hsl(var(--brand-official-text))",
					},
					follow: {
						bg: "hsl(var(--brand-follow-bg))",
						hover: "hsl(var(--brand-follow-hover))",
					},
					share: {
						border: "hsl(var(--brand-share-border))",
					},
					info: {
						bg: "hsl(var(--brand-info-bg))",
					},
					icon: {
						bg: "hsl(var(--brand-icon-bg))",
					},
				},
				// Promotion Colors
				promo: {
					gradient: {
						from: "hsl(var(--promo-gradient-from))",
						to: "hsl(var(--promo-gradient-to))",
					},
					badge: {
						bg: "hsl(var(--promo-badge-bg))",
						text: "hsl(var(--promo-badge-text))",
					},
					button: {
						bg: "hsl(var(--promo-button-bg))",
						text: "hsl(var(--promo-button-text))",
						hover: "hsl(var(--promo-button-hover))",
					},
				},
				// Product Colors
				product: {
					discounted: "hsl(var(--product-discounted))",
					rating: "hsl(var(--product-rating))",
					ratingCount: "hsl(var(--product-rating-count))",
					tumanIcon: "hsl(var(--product-tuman-icon))",
				},
				// Review Colors
				review: {
					helpful: "hsl(var(--review-helpful))",
					helpfulHover: "hsl(var(--review-helpful-hover))",
					notHelpful: "hsl(var(--review-not-helpful))",
					notHelpfulHover: "hsl(var(--review-not-helpful-hover))",
					border: "hsl(var(--review-border))",
					input: {
						bg: "hsl(var(--review-input-bg))",
						border: "hsl(var(--review-input-border))",
					},
					submit: {
						bg: "hsl(var(--review-submit-bg))",
						hover: "hsl(var(--review-submit-hover))",
					},
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
	plugins: [tailwindcssAnimate],
};

export default config;