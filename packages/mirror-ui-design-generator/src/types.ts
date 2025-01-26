import type { GeneratorConfig as BaseGeneratorConfig } from "@fandhe/mirror-design-generator";

export interface UIGeneratorConfig extends BaseGeneratorConfig {
	components: string[];
	themes?: Record<string, unknown>;
}

export interface UIComponentSpec {
	name: string;
	variants: string[];
	states: string[];
	properties: Record<string, unknown>;
}
