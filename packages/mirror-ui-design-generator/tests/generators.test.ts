import { describe, expect, it } from "vitest";
import { UIDesignGenerator } from "../src/generators";

describe("UIDesignGenerator", () => {
	it("should be instantiable with config", () => {
		const generator = new UIDesignGenerator({ components: [] });
		expect(generator).toBeInstanceOf(UIDesignGenerator);
	});

	it("should have generate method", () => {
		const generator = new UIDesignGenerator({ components: [] });
		expect(generator.generate).toBeInstanceOf(Function);
	});
});
