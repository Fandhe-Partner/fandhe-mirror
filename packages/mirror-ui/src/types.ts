/**
 * Base component interface for all Mirror UI components
 */
export interface Component {
	/** Unique identifier for the component */
	id?: string;
	/** Component name */
	name: string;
	/** Component props */
	props: Record<string, unknown>;
	/** Component children */
	children?: Component[];
	/** Component state */
	state?: Record<string, unknown>;
	/** Component event handlers */
	events?: Record<string, ((...args: unknown[]) => void) | undefined>;
	/** Component styles */
	styles?: Record<string, unknown>;
	/** Component accessibility attributes */
	a11y?: {
		role?: string;
		label?: string;
		description?: string;
		[key: string]: unknown;
	};
}

/**
 * Component factory options
 */
export interface ComponentOptions {
	/** Initial component props */
	props?: Record<string, unknown>;
	/** Initial component state */
	state?: Record<string, unknown>;
	/** Component event handlers */
	events?: Record<string, ((...args: unknown[]) => void) | undefined>;
	/** Component styles */
	styles?: Record<string, unknown>;
	/** Component accessibility attributes */
	a11y?: {
		role?: string;
		label?: string;
		description?: string;
		[key: string]: unknown;
	};
}

/**
 * Component factory function type
 */
export type ComponentFactory = (name: string, options?: ComponentOptions) => Component;

/**
 * Component update options
 */
export interface ComponentUpdateOptions {
	props?: Record<string, unknown>;
	state?: Record<string, unknown>;
	events?: Record<string, (...args: unknown[]) => void>;
	styles?: Record<string, unknown>;
	a11y?: Record<string, unknown>;
}
