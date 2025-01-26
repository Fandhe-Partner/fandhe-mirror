import { describe, expect, it } from 'vitest';
import { createComponent } from '../../src/component';
import { createVueAdapter } from '../../src/adapters/vue';

describe('Vue Adapter', () => {
	it('should convert Mirror UI component to Vue component', () => {
		const component = createComponent('button', {
			props: { label: 'Click me' },
			events: { onClick: () => {} },
			styles: { backgroundColor: 'blue' },
			a11y: { role: 'button' },
		});

		const adapter = createVueAdapter();
		const vueComponent = adapter.toFramework(component);

		expect(vueComponent.name).toBe('button');
		expect(vueComponent.props).toHaveProperty('label', 'Click me');
		expect(vueComponent.props).toHaveProperty('role', 'button');
		expect(vueComponent.props).toHaveProperty('style');
		expect(vueComponent.emits).toContain('onClick');
	});

	it('should convert Vue component to Mirror UI component', () => {
		const vueComponent = {
			name: 'button',
			props: {
				label: 'Click me',
				role: 'button',
				style: { backgroundColor: 'blue' },
			},
			setup: () => ({ onClick: () => {} }),
		};

		const adapter = createVueAdapter();
		const component = adapter.fromFramework(vueComponent);

		expect(component.name).toBe('button');
		expect(component.props).toHaveProperty('label', 'Click me');
		expect(component.props).toHaveProperty('role', 'button');
		expect(component.styles).toEqual({ backgroundColor: 'blue' });
		expect(component.events).toHaveProperty('onClick');
	});
});
