import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import netlify from "@netlify/vite-plugin-tanstack-start";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        tanstackStart(),
        tailwindcss(),
        netlify(),
        viteReact(),
    ],
});
