import { describe, expect, it } from 'vitest';
import { createComponent } from '../../src/component';
import { createReactAdapter } from '../../src/adapters/react';

describe('React Adapter', () => {
	it('should convert Mirror UI component to React component', () => {
		const component = createComponent('button', {
			props: { label: 'Click me' },
			events: { onClick: () => {} },
			styles: { backgroundColor: 'blue' },
			a11y: { role: 'button' },
		});

		const adapter = createReactAdapter();
		const reactComponent = adapter.toFramework(component);

		expect(reactComponent.type).toBe('button');
		expect(reactComponent.props).toHaveProperty('label', 'Click me');
		expect(reactComponent.props).toHaveProperty('onClick');
		expect(reactComponent.props).toHaveProperty('role', 'button');
		expect(reactComponent.props).toHaveProperty('style');
	});

	it('should convert React component to Mirror UI component', () => {
		const reactComponent = {
			type: 'button',
			props: {
				label: 'Click me',
				onClick: () => {},
				role: 'button',
				style: { backgroundColor: 'blue' },
			},
		};

		const adapter = createReactAdapter();
		const component = adapter.fromFramework(reactComponent);

		expect(component.name).toBe('button');
		expect(component.props).toHaveProperty('label', 'Click me');
		expect(component.props).toHaveProperty('onClick');
		expect(component.props).toHaveProperty('role', 'button');
		expect(component.styles).toEqual({ backgroundColor: 'blue' });
	});
});
