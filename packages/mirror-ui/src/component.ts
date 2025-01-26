import { Component, ComponentFactory, ComponentOptions, ComponentUpdateOptions } from './types';

/**
 * Creates a new component instance
 */
export const createComponent: ComponentFactory = (name: string, options: ComponentOptions = {}): Component => {
	const {
		props = {},
		state = {},
		events = {},
		styles = {},
		a11y = {},
	} = options;

	return {
		id: `${name}-${Math.random().toString(36).slice(2)}`,
		name,
		props,
		state,
		events,
		styles,
		a11y,
		children: [],
	};
};

/**
 * Updates a component with new options
 */
export const updateComponent = (
	component: Component,
	options: ComponentUpdateOptions,
): Component => {
	return {
		...component,
		props: { ...component.props, ...options.props },
		state: { ...component.state, ...options.state },
		events: { ...component.events, ...options.events },
		styles: { ...component.styles, ...options.styles },
		a11y: { ...component.a11y, ...options.a11y },
	};
};

/**
 * Adds a child component to a parent component
 */
export const addChild = (parent: Component, child: Component): Component => {
	return {
		...parent,
		children: [...(parent.children || []), child],
	};
};

/**
 * Removes a child component from a parent component
 */
export const removeChild = (parent: Component, childId: string): Component => {
	return {
		...parent,
		children: (parent.children || []).filter((child) => child.id !== childId),
	};
};
