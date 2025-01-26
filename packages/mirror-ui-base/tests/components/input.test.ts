import { describe, expect, it } from 'vitest';
import { createInput } from '../../src/components/input';

describe('Input Component', () => {
	it('should create an input with default props', () => {
		const input = createInput({ label: 'Username' });
		expect(input.name).toBe('input');
		expect(input.props.type).toBe('text');
		expect(input.props.value).toBe('');
		expect(input.props.disabled).toBe(false);
		expect(input.props.required).toBe(false);
		expect(input.props.label).toBe('Username');
	});

	it('should create an input with custom props', () => {
		const input = createInput({
			label: 'Email',
			type: 'email',
			value: 'test@example.com',
			placeholder: 'Enter email',
			disabled: true,
			required: true,
			error: 'Invalid email',
		});
		expect(input.props.type).toBe('email');
		expect(input.props.value).toBe('test@example.com');
		expect(input.props.placeholder).toBe('Enter email');
		expect(input.props.disabled).toBe(true);
		expect(input.props.required).toBe(true);
		expect(input.props.error).toBe('Invalid email');
	});

	it('should create an input with accessibility attributes', () => {
		const input = createInput({
			label: 'Email',
			required: true,
			error: 'Invalid email',
		});
		expect(input.a11y?.role).toBe('textbox');
		expect(input.a11y?.label).toBe('Email');
		expect(input.a11y?.['aria-required']).toBe(true);
		expect(input.a11y?.['aria-invalid']).toBe(true);
		expect(input.a11y?.['aria-errormessage']).toBe('Invalid email');
	});

	it('should create an input with event handlers', () => {
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const input = createInput(
			{ label: 'Username' },
			{ onChange, onFocus, onBlur },
		);

		expect(input.events?.onChange).toBe(onChange);
		expect(input.events?.onFocus).toBe(onFocus);
		expect(input.events?.onBlur).toBe(onBlur);
	});
});
