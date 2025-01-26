import type { Component } from '../types';
import type { FrameworkAdapter, AdapterOptions } from './types';

/**
 * Svelte-specific component type
 */
export interface SvelteComponent {
	name: string;
	props?: Record<string, unknown>;
	events?: Record<string, (...args: unknown[]) => void>;
	slots?: Record<string, unknown>;
	children?: SvelteComponent[];
}

/**
 * Svelte adapter for Mirror UI components
 */
export const createSvelteAdapter = (options?: AdapterOptions): FrameworkAdapter<SvelteComponent> => {
	return {
		framework: 'svelte',

		toFramework: (component: Component): SvelteComponent => {
			return {
				name: component.name,
				props: {
					...component.props,
					...component.a11y,
					style: component.styles,
				},
				events: component.events,
				children: component.children?.map((child) => createSvelteAdapter(options).toFramework(child)),
			};
		},

		fromFramework: (component: SvelteComponent): Component => {
			const { name, props = {}, events = {}, children } = component;
			const { style, ...rest } = props;

			return {
				name,
				props: rest,
				styles: style as Record<string, unknown>,
				events,
				children: children?.map((child) => createSvelteAdapter(options).fromFramework(child)),
			};
		},
	};
};
