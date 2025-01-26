import type { ComponentMetadata, GeneratorConfig } from "../types";

export class FrontendGenerator {
	constructor(private config: GeneratorConfig) {}

	async generate(metadata: ComponentMetadata[]): Promise<void> {
		// Implementation for frontend code generation
	}
}
