import type { Component } from '../types';
import type { FrameworkAdapter, AdapterOptions } from './types';

/**
 * Lit-specific component type
 */
export interface LitComponent {
	tagName: string;
	properties?: Record<string, unknown>;
	styles?: string[];
	events?: Record<string, (...args: unknown[]) => void>;
	children?: LitComponent[];
}

/**
 * Lit adapter for Mirror UI components
 */
export const createLitAdapter = (options?: AdapterOptions): FrameworkAdapter<LitComponent> => {
	return {
		framework: 'lit',

		toFramework: (component: Component): LitComponent => {
			return {
				tagName: component.name,
				properties: {
					...component.props,
					...component.a11y,
				},
				styles: [JSON.stringify(component.styles || {})],
				events: component.events,
				children: component.children?.map((child) => createLitAdapter(options).toFramework(child)),
			};
		},

		fromFramework: (component: LitComponent): Component => {
			const { tagName, properties = {}, styles = [], events = {}, children } = component;

			return {
				name: tagName,
				props: properties,
				styles: styles.length > 0 ? JSON.parse(styles[0]) : {},
				events,
				children: children?.map((child) => createLitAdapter(options).fromFramework(child)),
			};
		},
	};
};
