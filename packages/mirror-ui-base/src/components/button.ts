import { Component, ComponentOptions, createComponent } from '@fandhe/mirror-ui';

export interface ButtonProps {
	/** Button type */
	type?: 'button' | 'submit' | 'reset';
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Button label */
	label: string;
	/** Button variant */
	variant?: 'primary' | 'secondary' | 'text';
	/** Button size */
	size?: 'small' | 'medium' | 'large';
}

export interface ButtonEvents {
	/** Click event handler */
	onClick?: (event: unknown) => void;
	/** Focus event handler */
	onFocus?: (event: unknown) => void;
	/** Blur event handler */
	onBlur?: (event: unknown) => void;
}

/**
 * Creates an accessible button component
 */
export const createButton = (props: ButtonProps, events?: ButtonEvents): Component => {
	const options: ComponentOptions = {
		props: {
			type: props.type || 'button',
			disabled: props.disabled || false,
			label: props.label,
			variant: props.variant || 'primary',
			size: props.size || 'medium',
		},
		events: events || {},
		a11y: {
			role: 'button',
			label: props.label,
			'aria-disabled': props.disabled || false,
		},
	};

	return createComponent('button', options);
};
