import type { GeneratorConfig as BaseGeneratorConfig } from "@fandhe/mirror-frontend-generator";

export interface UIGeneratorConfig extends BaseGeneratorConfig {
	components: string[];
	styling?: "css" | "css-modules" | "css-in-js";
}

export interface UIComponentSpec {
	name: string;
	variants: string[];
	states: string[];
	properties: Record<string, unknown>;
}
