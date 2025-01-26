import { describe, expect, it } from "vitest";
import { FrontendGenerator } from "../src/generators";

describe("FrontendGenerator", () => {
	it("should be instantiable with config", () => {
		const generator = new FrontendGenerator({ framework: "react" });
		expect(generator).toBeInstanceOf(FrontendGenerator);
	});

	it("should have generate method", () => {
		const generator = new FrontendGenerator({ framework: "react" });
		expect(generator.generate).toBeInstanceOf(Function);
	});
});
