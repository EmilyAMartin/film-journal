import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	base: '/film-journal/', // keep this set to your repo path on GitHub Pages; change to '/' if deploying to user site root
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
