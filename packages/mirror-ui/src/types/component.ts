/**
 * Base interface for all Mirror UI components
 */
export interface MirrorComponent {
  /** Unique identifier for the component */
  id?: string;
  /** Additional class names */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA description */
  'aria-description'?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Interface for components that can receive focus
 */
export interface FocusableComponent extends MirrorComponent {
  /** Tab index for focus management */
  tabIndex?: number;
  /** Whether the component is focusable */
  focusable?: boolean;
  /** Callback when component receives focus */
  onFocus?: (event: FocusEvent) => void;
  /** Callback when component loses focus */
  onBlur?: (event: FocusEvent) => void;
}

/**
 * Interface for components that can be selected
 */
export interface SelectableComponent extends FocusableComponent {
  /** Whether the component is selected */
  selected?: boolean;
  /** Whether the component is checked */
  checked?: boolean;
  /** Callback when selection state changes */
  onChange?: (event: Event) => void;
}
