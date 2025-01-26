import { describe, expect, it } from 'vitest';
import { createComponent } from '../../src/component';
import { createLitAdapter } from '../../src/adapters/lit';

describe('Lit Adapter', () => {
	it('should convert Mirror UI component to Lit component', () => {
		const component = createComponent('button', {
			props: { label: 'Click me' },
			events: { onClick: () => {} },
			styles: { backgroundColor: 'blue' },
			a11y: { role: 'button' },
		});

		const adapter = createLitAdapter();
		const litComponent = adapter.toFramework(component);

		expect(litComponent.tagName).toBe('button');
		expect(litComponent.properties).toHaveProperty('label', 'Click me');
		expect(litComponent.properties).toHaveProperty('role', 'button');
		expect(litComponent.styles).toHaveLength(1);
		expect(litComponent.events).toHaveProperty('onClick');
	});

	it('should convert Lit component to Mirror UI component', () => {
		const litComponent = {
			tagName: 'button',
			properties: {
				label: 'Click me',
				role: 'button',
			},
			styles: ['{"backgroundColor":"blue"}'],
			events: { onClick: () => {} },
		};

		const adapter = createLitAdapter();
		const component = adapter.fromFramework(litComponent);

		expect(component.name).toBe('button');
		expect(component.props).toHaveProperty('label', 'Click me');
		expect(component.props).toHaveProperty('role', 'button');
		expect(component.styles).toEqual({ backgroundColor: 'blue' });
		expect(component.events).toHaveProperty('onClick');
	});
});
