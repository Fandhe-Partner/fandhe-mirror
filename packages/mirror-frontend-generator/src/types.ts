import type { FrameworkConfig } from "@fandhe/mirror-frontend-compiler";

export interface GeneratorConfig {
	framework: FrameworkConfig;
	outputDir: string;
	templates?: string[];
}

export interface ComponentMetadata {
	name: string;
	props: Record<string, unknown>;
	children?: ComponentMetadata[];
}
