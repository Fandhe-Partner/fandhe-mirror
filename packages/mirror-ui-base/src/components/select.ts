import { Component, ComponentOptions, createComponent } from '@fandhe/mirror-ui';

export interface SelectOption {
	/** Option value */
	value: string;
	/** Option label */
	label: string;
	/** Whether the option is disabled */
	disabled?: boolean;
}

export interface SelectProps {
	/** Select options */
	options: SelectOption[];
	/** Selected value */
	value?: string;
	/** Whether the select is disabled */
	disabled?: boolean;
	/** Whether the select is required */
	required?: boolean;
	/** Select label */
	label: string;
	/** Select error message */
	error?: string;
}

export interface SelectEvents {
	/** Change event handler */
	onChange?: (value: string) => void;
	/** Focus event handler */
	onFocus?: (event: unknown) => void;
	/** Blur event handler */
	onBlur?: (event: unknown) => void;
}

/**
 * Creates an accessible select component
 */
export const createSelect = (props: SelectProps, events?: SelectEvents): Component => {
	const options: ComponentOptions = {
		props: {
			options: props.options,
			value: props.value || '',
			disabled: props.disabled || false,
			required: props.required || false,
			label: props.label,
			error: props.error,
		},
		events: events || {},
		a11y: {
			role: 'combobox',
			label: props.label,
			'aria-disabled': props.disabled || false,
			'aria-required': props.required || false,
			'aria-invalid': !!props.error,
			'aria-errormessage': props.error,
			'aria-expanded': false,
			'aria-controls': `select-${Math.random().toString(36).slice(2)}`,
		},
	};

	return createComponent('select', options);
};
