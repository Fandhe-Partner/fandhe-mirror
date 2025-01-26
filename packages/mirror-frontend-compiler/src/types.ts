export type Framework = "react" | "vue" | "svelte" | "lit" | "solid";

export interface FrameworkConfig {
	framework: Framework;
	version?: string;
}

export interface CompilerOptions {
	framework: FrameworkConfig;
	typescript?: boolean;
	cssInJs?: boolean;
}
