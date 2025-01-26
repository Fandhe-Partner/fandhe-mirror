import React, {
  forwardRef,
  useRef,
  useEffect,
  type ComponentType,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ElementType,
  type ForwardedRef
} from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import { setAriaAttributes, setAriaRole, type AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

interface BaseProps {
  as?: ElementType;
  'aria-label'?: string;
  'aria-description'?: string;
  tabIndex?: number;
  focusable?: boolean;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  selected?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent) => void;
}

type WrappedComponentProps<P> = P & BaseProps;

type WrappedComponent<P> = ForwardRefExoticComponent<WrappedComponentProps<P> & RefAttributes<ElementType>>;

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef<ElementType, WrappedComponentProps<P>>((props, ref) => {
    const { as: As = Component, ...rest } = props;
    return <As {...rest} ref={ref} />;
  });
}

/**
 * Hook for managing focus trap
 */
export function useFocusTrap() {
  const containerRef = useRef<HTMLElement>(null);
  const focusTrapRef = useRef<FocusTrap | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      focusTrapRef.current = new FocusTrap(containerRef.current);
      focusTrapRef.current.activate();
    }

    return () => {
      focusTrapRef.current?.deactivate();
    };
  }, []);

  return containerRef;
}

/**
 * Hook for managing focus restoration
 */
export function useFocusGuard() {
  const focusGuardRef = useRef(new FocusGuard());

  useEffect(() => {
    focusGuardRef.current.save();
    return () => {
      focusGuardRef.current.restore();
    };
  }, []);
}

/**
 * HOC to add ARIA support to a component
 */
export function withAria<P extends MirrorComponent>(
  Component: ComponentType<P>,
  role?: AriaRole
): WrappedComponent<P> {
  return forwardRef<ElementType, WrappedComponentProps<P>>((props, ref) => {
    const { as: As = Component, 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...rest } = props;
    return (
      <As
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        role={role}
      />
    );
  });
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef<ElementType, WrappedComponentProps<P>>((props, ref) => {
    const { as: As = Component, tabIndex, focusable, onFocus, onBlur, ...rest } = props;
    return (
      <As
        {...rest}
        ref={ref}
        tabIndex={focusable ? tabIndex ?? 0 : -1}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  });
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef<ElementType, WrappedComponentProps<P>>((props, ref) => {
    const { as: As = Component, selected, checked, onChange, ...rest } = props;
    return (
      <As
        {...rest}
        ref={ref}
        aria-selected={selected}
        aria-checked={checked}
        onChange={onChange}
      />
    );
  });
}
