/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		`./src/pages/**/*.{js,jsx,ts,tsx}`,
		`./src/components/**/*.{js,jsx,ts,tsx}`,
	],
	theme: {
		
		extend: {
			screens:{
				'3xl':'1920px'
			},
			backgroundImage: {
				"banner-image-lg": "url('/images/banner-bg.svg')",
				"authors": "url('/images/authors.png')",
				"globe": "url('/images/globe.svg')",
				"globe-light": "url('/images/globe-light.svg')",
				"banner-light": "url('/images/EverySim_Landscape_1.svg')",
				"nav-light": "url('/images/nav.png')",
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				brandPrimary: "#161E23",
				brandSecondary: "#065774",
				brandHighlight: "#008BAA",
				brandLight: "#D6F8FF",
				brandDark:"#1b262c",
				"footer-bg":"#eaf1f7",
				"skyblue":"#f4f9fc",
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				anton: ["'Archivo Black'", 'sans-serif'],
				robotoCondensed: ['"Roboto Condensed"', 'sans-serif'], 
				spoqa: ['Spoqa Han Sans Neo', 'sans-serif'],
				sans: ['Noto Sans', 'sans-serif'],
				archivo: ['Archivo Black', 'sans-serif'],
			},
			animation: {
				scroll: 'scroll 20s linear infinite',
			  },
			  keyframes: {
				scroll: {
				  '0%': { transform: 'translateX(0)' },
				  '100%': { transform: 'translateX(-100%)' },
				},
			  },
		}
	},
	darkMode: 'class',
	plugins: [require("tailwindcss-animate"), require('tailwind-scrollbar')],
}
