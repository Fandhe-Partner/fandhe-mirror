import type { Component } from '../types';
import type { FrameworkAdapter, AdapterOptions } from './types';

/**
 * Vue-specific component type
 */
export interface VueComponent {
	name: string;
	props?: Record<string, unknown>;
	emits?: string[];
	setup?: () => Record<string, unknown>;
	children?: VueComponent[];
}

/**
 * Vue adapter for Mirror UI components
 */
export const createVueAdapter = (options?: AdapterOptions): FrameworkAdapter<VueComponent> => {
	return {
		framework: 'vue',

		toFramework: (component: Component): VueComponent => {
			return {
				name: component.name,
				props: {
					...component.props,
					...component.a11y,
					style: component.styles,
				},
				emits: Object.keys(component.events || {}),
				setup: () => component.events || {},
				children: component.children?.map((child) => createVueAdapter(options).toFramework(child)),
			};
		},

		fromFramework: (component: VueComponent): Component => {
			const { name, props = {}, setup, children } = component;
			const { style, ...rest } = props;

			return {
				name,
				props: rest,
				styles: style as Record<string, unknown>,
				events: setup?.() || {},
				children: children?.map((child) => createVueAdapter(options).fromFramework(child)),
			};
		},
	};
};
