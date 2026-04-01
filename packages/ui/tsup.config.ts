import { defineConfig } from "tsup";

export default defineConfig({
	clean: true,
	dts: true,
	entry: ["src/index.ts"],
	external: ["react", "react-dom"],
	format: ["esm"],
	minify: true,
	outDir: "dist",
	sourcemap: false,
	splitting: false,
	treeshake: true,
	watch: false,
});
