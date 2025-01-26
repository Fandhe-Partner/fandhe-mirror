import { describe, expect, it } from 'vitest';
import { createComponent } from '../../src/component';
import { createSvelteAdapter } from '../../src/adapters/svelte';

describe('Svelte Adapter', () => {
	it('should convert Mirror UI component to Svelte component', () => {
		const component = createComponent('button', {
			props: { label: 'Click me' },
			events: { onClick: () => {} },
			styles: { backgroundColor: 'blue' },
			a11y: { role: 'button' },
		});

		const adapter = createSvelteAdapter();
		const svelteComponent = adapter.toFramework(component);

		expect(svelteComponent.name).toBe('button');
		expect(svelteComponent.props).toHaveProperty('label', 'Click me');
		expect(svelteComponent.props).toHaveProperty('role', 'button');
		expect(svelteComponent.props).toHaveProperty('style');
		expect(svelteComponent.events).toHaveProperty('onClick');
	});

	it('should convert Svelte component to Mirror UI component', () => {
		const svelteComponent = {
			name: 'button',
			props: {
				label: 'Click me',
				role: 'button',
				style: { backgroundColor: 'blue' },
			},
			events: { onClick: () => {} },
		};

		const adapter = createSvelteAdapter();
		const component = adapter.fromFramework(svelteComponent);

		expect(component.name).toBe('button');
		expect(component.props).toHaveProperty('label', 'Click me');
		expect(component.props).toHaveProperty('role', 'button');
		expect(component.styles).toEqual({ backgroundColor: 'blue' });
		expect(component.events).toHaveProperty('onClick');
	});
});
