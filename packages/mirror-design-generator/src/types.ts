import type { DesignToolConfig } from "@fandhe/mirror-design-compiler";

export interface GeneratorConfig {
	tool: DesignToolConfig;
	outputDir: string;
	templates?: string[];
}

export interface AssetMetadata {
	name: string;
	type: string;
	properties: Record<string, unknown>;
}
