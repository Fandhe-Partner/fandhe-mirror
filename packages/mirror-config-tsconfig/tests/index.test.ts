import { describe, expect, it } from "vitest";
import { baseConfig } from "../src";

describe("mirror-config-tsconfig", () => {
	it("should export base configuration", () => {
		expect(baseConfig).toBeDefined();
		expect(baseConfig.compilerOptions).toBeDefined();
	});

	it("should have correct compiler options", () => {
		const { compilerOptions } = baseConfig;
		expect(compilerOptions.target).toBe("ES2020");
		expect(compilerOptions.module).toBe("ESNext");
		expect(compilerOptions.declaration).toBe(true);
		expect(compilerOptions.strict).toBe(true);
		expect(compilerOptions.moduleResolution).toBe("node");
	});

	it("should have correct include/exclude settings", () => {
		expect(baseConfig.include).toContain("src");
		expect(baseConfig.exclude).toContain("node_modules");
		expect(baseConfig.exclude).toContain("dist");
	});
});
