import { describe, expect, it } from 'vitest';
import { createSelect } from '../../src/components/select';

describe('Select Component', () => {
	const options = [
		{ value: '1', label: 'Option 1' },
		{ value: '2', label: 'Option 2' },
		{ value: '3', label: 'Option 3', disabled: true },
	];

	it('should create a select with default props', () => {
		const select = createSelect({ label: 'Choose option', options });
		expect(select.name).toBe('select');
		expect(select.props.value).toBe('');
		expect(select.props.disabled).toBe(false);
		expect(select.props.required).toBe(false);
		expect(select.props.label).toBe('Choose option');
		expect(select.props.options).toBe(options);
	});

	it('should create a select with custom props', () => {
		const select = createSelect({
			label: 'Choose option',
			options,
			value: '1',
			disabled: true,
			required: true,
			error: 'Please select an option',
		});
		expect(select.props.value).toBe('1');
		expect(select.props.disabled).toBe(true);
		expect(select.props.required).toBe(true);
		expect(select.props.error).toBe('Please select an option');
	});

	it('should create a select with accessibility attributes', () => {
		const select = createSelect({
			label: 'Choose option',
			options,
			required: true,
			error: 'Please select an option',
		});
		expect(select.a11y?.role).toBe('combobox');
		expect(select.a11y?.label).toBe('Choose option');
		expect(select.a11y?.['aria-required']).toBe(true);
		expect(select.a11y?.['aria-invalid']).toBe(true);
		expect(select.a11y?.['aria-errormessage']).toBe('Please select an option');
		expect(select.a11y?.['aria-expanded']).toBe(false);
		expect(select.a11y?.['aria-controls']).toBeDefined();
	});

	it('should create a select with event handlers', () => {
		const onChange = () => {};
		const onFocus = () => {};
		const onBlur = () => {};

		const select = createSelect(
			{ label: 'Choose option', options },
			{ onChange, onFocus, onBlur },
		);

		expect(select.events?.onChange).toBe(onChange);
		expect(select.events?.onFocus).toBe(onFocus);
		expect(select.events?.onBlur).toBe(onBlur);
	});
});
