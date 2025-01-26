import { describe, expect, it } from 'vitest';
import { createComponent, updateComponent, addChild, removeChild } from '../src/component';
import type { Component } from '../src/types';

describe('Component Factory', () => {
	it('should create a component with default options', () => {
		const component = createComponent('test');
		expect(component.name).toBe('test');
		expect(component.props).toEqual({});
		expect(component.state).toEqual({});
		expect(component.events).toEqual({});
		expect(component.styles).toEqual({});
		expect(component.a11y).toEqual({});
		expect(component.children).toEqual([]);
		expect(component.id).toBeDefined();
	});

	it('should create a component with custom options', () => {
		const options = {
			props: { foo: 'bar' },
			state: { count: 0 },
			events: { onClick: () => {} },
			styles: { color: 'red' },
			a11y: { role: 'button' },
		};
		const component = createComponent('test', options);
		expect(component.props).toEqual(options.props);
		expect(component.state).toEqual(options.state);
		expect(component.events).toEqual(options.events);
		expect(component.styles).toEqual(options.styles);
		expect(component.a11y).toEqual(options.a11y);
	});
});

describe('Component Updates', () => {
	it('should update component properties', () => {
		const component = createComponent('test');
		const updates = {
			props: { foo: 'bar' },
			state: { count: 0 },
		};
		const updated = updateComponent(component, updates);
		expect(updated.props).toEqual(updates.props);
		expect(updated.state).toEqual(updates.state);
	});
});

describe('Component Children', () => {
	it('should add child components', () => {
		const parent = createComponent('parent');
		const child = createComponent('child');
		const updated = addChild(parent, child);
		expect(updated.children).toHaveLength(1);
		expect(updated.children?.[0]).toEqual(child);
	});

	it('should remove child components', () => {
		const parent = createComponent('parent');
		const child = createComponent('child');
		const withChild = addChild(parent, child);
		const withoutChild = removeChild(withChild, child.id!);
		expect(withoutChild.children).toHaveLength(0);
	});
});
