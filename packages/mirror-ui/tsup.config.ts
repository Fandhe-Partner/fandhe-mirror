import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      jsx: "react-jsx",
      jsxImportSource: "react"
    }
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "react";
  },
});
