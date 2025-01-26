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

type WrappedComponentProps<P> = P & {
  as?: ElementType;
};

type WrappedComponent<P> = ForwardRefExoticComponent<WrappedComponentProps<P> & RefAttributes<unknown>>;

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<unknown, WrappedComponentProps<P>>((props, ref) => {
    const { as: As = Component, ...rest } = props;
    return <As {...rest} ref={ref} />;
  });

  Wrapped.displayName = `Mirror(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
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
  const Wrapped = forwardRef<unknown, WrappedComponentProps<P>>((props, ref) => {
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

  Wrapped.displayName = `WithAria(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<unknown, WrappedComponentProps<P>>((props, ref) => {
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

  Wrapped.displayName = `WithFocus(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<unknown, WrappedComponentProps<P>>((props, ref) => {
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

  Wrapped.displayName = `WithSelection(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}
