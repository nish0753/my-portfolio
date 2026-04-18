import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			backgroundSize: {
				'200%': '200%',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ghibli: {
					green: '#8BC67B',
					blue: '#85C2D6',
					skyblue: '#C2E7F2',
					yellow: '#FFDF7F',
					orange: '#F7C683',
					brown: '#947A5A',
					lightbrown: '#D4B594',
					gray: '#ADB2B6',
					darkgreen: '#3A6B35',
					red: '#E76F68',
					purple: '#AF9EB3',
					cream: '#F8F2E2',
					darkbrown: '#624C3C'
				},
				magic: {
					purple: '#7E69AB',
					deepPurple: '#4A3A65',
					violet: '#9B87F5',
					teal: '#3ECBB2',
					deepTeal: '#1A8D7B',
					navy: '#1A1F2C',
					gold: '#F2CF63',
					starlight: '#F5EFD9',
					midnight: '#0E1326',
					twilight: '#D6BCFA',
					dream: '#E5DEFF',
					spark: '#FFD166',
					enchant: '#845EC2',
					dawn: '#FEC6A1'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				festival: {
					amber: '#FFB300',
					gold: '#FFD700',
					orange: '#FF9800',
					red: '#F44336',
					rose: '#E91E63',
					emerald: '#4CAF50',
					lantern: '#FFA726',
					light: '#FFECB3',
				},
				professional: {
					navy: '#1E293B',
					deepBlue: '#0F172A',
					indigo: '#4F46E5',
					lightIndigo: '#818CF8',
					slate: '#64748B',
					white: '#F8FAFC',
					highlight: '#38BDF8',
					accent: '#3B82F6',
					muted: '#334155'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				breathe: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.03)' }
				},
				sway: {
					'0%, 100%': { transform: 'rotate(-2deg) translateY(-2px)' },
					'50%': { transform: 'rotate(2deg) translateY(2px)' }
				},
				twinkle: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 8s ease-in-out infinite',
				'breathe': 'breathe 10s ease-in-out infinite',
				'sway': 'sway 8s ease-in-out infinite',
				'twinkle': 'twinkle 4s ease-in-out infinite',
				'shimmer': 'shimmer 8s ease-in-out infinite',
				'shimmer-slow': 'shimmer 12s ease-in-out infinite'
			},
			boxShadow: {
				'ghibli': '0 8px 30px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
				'ghibli-hover': '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)',
				'magic': '0 8px 30px rgba(123, 104, 238, 0.2), 0 2px 8px rgba(123, 104, 238, 0.1)',
				'magic-hover': '0 12px 40px rgba(123, 104, 238, 0.3), 0 4px 12px rgba(123, 104, 238, 0.15)',
				'cosmic': '0 8px 30px rgba(62, 203, 178, 0.2), 0 2px 8px rgba(62, 203, 178, 0.1)',
				'lantern': '0 8px 30px rgba(255, 167, 38, 0.3), 0 2px 8px rgba(255, 167, 38, 0.2)',
				'festive': '0 8px 30px rgba(255, 215, 0, 0.2), 0 2px 8px rgba(255, 215, 0, 0.1)',
				'professional': '0 8px 30px rgba(79, 70, 229, 0.15), 0 2px 8px rgba(79, 70, 229, 0.08)',
				'professional-hover': '0 12px 40px rgba(79, 70, 229, 0.25), 0 4px 12px rgba(79, 70, 229, 0.12)'
			},
			backgroundImage: {
				'ghibli-gradient': 'linear-gradient(to bottom, #F8F2E2, #E5F2F2)',
				'ghibli-card': 'linear-gradient(to bottom right, #FFFFFF, #F8F6F0)',
				'magic-gradient': 'linear-gradient(to bottom, #1A1F2C, #4A3A65)',
				'cosmic-gradient': 'linear-gradient(135deg, #0E1326, #3A275F)',
				'starlight-gradient': 'linear-gradient(to bottom right, #D6BCFA, #E5DEFF)',
				'shimmer': 'linear-gradient(to right, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)',
				'twilight-card': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(155, 135, 245, 0.05))',
				'festive-gradient': 'linear-gradient(135deg, #1F1D12, #372718)',
				'lantern-glow': 'radial-gradient(circle, rgba(255,167,38,0.4) 0%, rgba(255,167,38,0) 70%)',
				'professional-gradient': 'linear-gradient(135deg, #0f172a, #1e293b)',
				'professional-card': 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.03), rgba(59, 130, 246, 0.05))',
				'professional-glow': 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
