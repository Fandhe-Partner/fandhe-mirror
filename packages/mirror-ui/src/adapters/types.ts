/**
 * Framework adapter interface for Mirror UI components
 */
export interface FrameworkAdapter<T = unknown> {
	/** Framework name */
	framework: 'react' | 'vue' | 'svelte' | 'lit' | 'solid';

	/** Convert Mirror UI component to framework-specific component */
	toFramework: (component: import('../types').Component) => T;

	/** Convert framework-specific component to Mirror UI component */
	fromFramework: (component: T) => import('../types').Component;
}

/**
 * Framework-specific component options
 */
export interface FrameworkOptions {
	/** Framework-specific props */
	[key: string]: unknown;
}

/**
 * Framework adapter factory options
 */
export interface AdapterOptions {
	/** Framework-specific options */
	frameworkOptions?: FrameworkOptions;
}
