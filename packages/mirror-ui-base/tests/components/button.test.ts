import { describe, expect, it } from 'vitest';
import { createButton } from '../../src/components/button';

describe('Button Component', () => {
	it('should create a button with default props', () => {
		const button = createButton({ label: 'Click me' });
		expect(button.name).toBe('button');
		expect(button.props.type).toBe('button');
		expect(button.props.disabled).toBe(false);
		expect(button.props.label).toBe('Click me');
		expect(button.props.variant).toBe('primary');
		expect(button.props.size).toBe('medium');
	});

	it('should create a button with custom props', () => {
		const button = createButton({
			label: 'Submit',
			type: 'submit',
			disabled: true,
			variant: 'secondary',
			size: 'large',
		});
		expect(button.props.type).toBe('submit');
		expect(button.props.disabled).toBe(true);
		expect(button.props.variant).toBe('secondary');
		expect(button.props.size).toBe('large');
	});

	it('should create a button with accessibility attributes', () => {
		const button = createButton({ label: 'Click me', disabled: true });
		expect(button.a11y?.role).toBe('button');
		expect(button.a11y?.label).toBe('Click me');
		expect(button.a11y?.['aria-disabled']).toBe(true);
	});

	it('should create a button with event handlers', () => {
		const onClick = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const button = createButton(
			{ label: 'Click me' },
			{ onClick, onFocus, onBlur },
		);

		expect(button.events?.onClick).toBe(onClick);
		expect(button.events?.onFocus).toBe(onFocus);
		expect(button.events?.onBlur).toBe(onBlur);
	});
});
