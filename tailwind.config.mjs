/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				brand: {
					dark: '#020617',
					electric: '#2563eb',
					cyan: '#06b6d4',
					vibe: '#8b5cf6',
					mint: '#10b981',
				}
			},
			backgroundImage: {
				'digital-mesh': "url('/assets/bg-mesh.png')",
				'gradient-premium': 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
			},
			boxShadow: {
				'neon': '0 0 15px rgba(37, 99, 235, 0.4)',
				'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
			}
		},
	},
	plugins: [],
}
