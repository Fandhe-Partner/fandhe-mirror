import { Component, ComponentOptions, createComponent } from '@fandhe/mirror-ui';

export interface InputProps {
	/** Input type */
	type?: 'text' | 'password' | 'email' | 'number';
	/** Input value */
	value?: string;
	/** Input placeholder */
	placeholder?: string;
	/** Whether the input is disabled */
	disabled?: boolean;
	/** Whether the input is required */
	required?: boolean;
	/** Input label */
	label: string;
	/** Input error message */
	error?: string;
}

export interface InputEvents {
	/** Change event handler */
	onChange?: (value: string) => void;
	/** Focus event handler */
	onFocus?: (event: unknown) => void;
	/** Blur event handler */
	onBlur?: (event: unknown) => void;
}

/**
 * Creates an accessible input component
 */
export const createInput = (props: InputProps, events?: InputEvents): Component => {
	const options: ComponentOptions = {
		props: {
			type: props.type || 'text',
			value: props.value || '',
			placeholder: props.placeholder || '',
			disabled: props.disabled || false,
			required: props.required || false,
			label: props.label,
			error: props.error,
		},
		events: events || {},
		a11y: {
			role: 'textbox',
			label: props.label,
			'aria-disabled': props.disabled || false,
			'aria-required': props.required || false,
			'aria-invalid': !!props.error,
			'aria-errormessage': props.error,
		},
	};

	return createComponent('input', options);
};
