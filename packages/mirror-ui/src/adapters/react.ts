import type { Component } from '../types';
import type { FrameworkAdapter, AdapterOptions } from './types';

/**
 * React-specific component type
 */
export interface ReactComponent {
	type: string;
	props: Record<string, unknown>;
	children?: ReactComponent[];
}

/**
 * React adapter for Mirror UI components
 */
export const createReactAdapter = (options?: AdapterOptions): FrameworkAdapter<ReactComponent> => {
	return {
		framework: 'react',

		toFramework: (component: Component): ReactComponent => {
			return {
				type: component.name,
				props: {
					...component.props,
					...component.events,
					...component.a11y,
					style: component.styles,
				},
				children: component.children?.map((child) => createReactAdapter(options).toFramework(child)),
			};
		},

		fromFramework: (component: ReactComponent): Component => {
			const { type, props, children } = component;
			const { style, ...rest } = props;

			return {
				name: type,
				props: rest,
				styles: style as Record<string, unknown>,
				children: children?.map((child) => createReactAdapter(options).fromFramework(child)),
			};
		},
	};
};
