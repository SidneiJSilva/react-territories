import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { federation } from "@module-federation/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "territoriesApp",
			filename: "remoteEntry.js",
			exposes: {
				"./App": "./src/TerritoriesRoutes.tsx",
			},
			shared: ["react", "react-dom", "react-router-dom"],
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5174,
	},
	preview: {
		port: 4174,
		strictPort: true,
	},
	build: {
		target: "esnext",
		minify: false,
		cssCodeSplit: false,
		modulePreload: false,
	},
});
