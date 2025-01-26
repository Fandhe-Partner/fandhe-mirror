import type { Component } from '../types';
import type { FrameworkAdapter, AdapterOptions } from './types';

/**
 * Solid-specific component type
 */
export interface SolidComponent {
	name: string;
	props?: Record<string, unknown>;
	events?: Record<string, (...args: unknown[]) => void>;
	styles?: Record<string, unknown>;
	children?: SolidComponent[];
}

/**
 * Solid adapter for Mirror UI components
 */
export const createSolidAdapter = (options?: AdapterOptions): FrameworkAdapter<SolidComponent> => {
	return {
		framework: 'solid',

		toFramework: (component: Component): SolidComponent => {
			return {
				name: component.name,
				props: {
					...component.props,
					...component.a11y,
				},
				events: component.events,
				styles: component.styles,
				children: component.children?.map((child) => createSolidAdapter(options).toFramework(child)),
			};
		},

		fromFramework: (component: SolidComponent): Component => {
			const { name, props = {}, events = {}, styles = {}, children } = component;

			return {
				name,
				props,
				styles,
				events,
				children: children?.map((child) => createSolidAdapter(options).fromFramework(child)),
			};
		},
	};
};
