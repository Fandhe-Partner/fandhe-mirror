import { describe, expect, it } from "vitest";
import { baseConfig } from "../src";

describe("mirror-config-biome", () => {
	it("should export base configuration", () => {
		expect(baseConfig).toBeDefined();
		expect(baseConfig.formatter).toBeDefined();
		expect(baseConfig.linter).toBeDefined();
		expect(baseConfig.javascript).toBeDefined();
	});

	it("should have correct formatter settings", () => {
		expect(baseConfig.formatter?.enabled).toBe(true);
		expect(baseConfig.formatter?.indentStyle).toBe("space");
		expect(baseConfig.formatter?.indentWidth).toBe(2);
		expect(baseConfig.formatter?.lineWidth).toBe(100);
	});

	it("should have correct linter settings", () => {
		expect(baseConfig.linter?.enabled).toBe(true);
		expect(baseConfig.linter?.rules?.recommended).toBe(true);
		expect(baseConfig.linter?.rules?.correctness?.noUnusedVariables).toBe(
			"error",
		);
		expect(baseConfig.linter?.rules?.suspicious?.noExplicitAny).toBe("error");
	});

	it("should have correct javascript settings", () => {
		expect(baseConfig.javascript?.formatter?.quoteStyle).toBe("single");
		expect(baseConfig.javascript?.formatter?.trailingComma).toBe("es5");
	});
});
