import { describe, expect, it } from 'vitest';
import { createComponent, Component } from '../src';

describe('mirror-ui', () => {
	it('should export core functionality', () => {
		expect(createComponent).toBeDefined();
		const component = createComponent('test');
		expect(component).toBeDefined();
		expect(component.name).toBe('test');
	});
});
