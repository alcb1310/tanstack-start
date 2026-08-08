import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tanstackStart(),

		// react's vite plugin MUST come after start's vite plugin
		viteReact(),
	],
});
