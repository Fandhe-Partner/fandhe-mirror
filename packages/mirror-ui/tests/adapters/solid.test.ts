import { describe, expect, it } from 'vitest';
import { createComponent } from '../../src/component';
import { createSolidAdapter } from '../../src/adapters/solid';

describe('Solid Adapter', () => {
	it('should convert Mirror UI component to Solid component', () => {
		const component = createComponent('button', {
			props: { label: 'Click me' },
			events: { onClick: () => {} },
			styles: { backgroundColor: 'blue' },
			a11y: { role: 'button' },
		});

		const adapter = createSolidAdapter();
		const solidComponent = adapter.toFramework(component);

		expect(solidComponent.name).toBe('button');
		expect(solidComponent.props).toHaveProperty('label', 'Click me');
		expect(solidComponent.props).toHaveProperty('role', 'button');
		expect(solidComponent.styles).toEqual({ backgroundColor: 'blue' });
		expect(solidComponent.events).toHaveProperty('onClick');
	});

	it('should convert Solid component to Mirror UI component', () => {
		const solidComponent = {
			name: 'button',
			props: {
				label: 'Click me',
				role: 'button',
			},
			styles: { backgroundColor: 'blue' },
			events: { onClick: () => {} },
		};

		const adapter = createSolidAdapter();
		const component = adapter.fromFramework(solidComponent);

		expect(component.name).toBe('button');
		expect(component.props).toHaveProperty('label', 'Click me');
		expect(component.props).toHaveProperty('role', 'button');
		expect(component.styles).toEqual({ backgroundColor: 'blue' });
		expect(component.events).toHaveProperty('onClick');
	});
});
