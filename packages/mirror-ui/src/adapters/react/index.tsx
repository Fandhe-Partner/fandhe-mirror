import React, {
  forwardRef,
  useRef,
  useEffect,
  type ComponentType,
  type ForwardRefRenderFunction,
  type PropsWithoutRef,
  type RefAttributes,
  type ElementType,
  type ReactElement,
  type ForwardedRef
} from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import { setAriaAttributes, setAriaRole, type AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

type ReactProps<P> = P & RefAttributes<HTMLElement>;

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  const WrappedComponent = forwardRef<HTMLElement, P>((props, ref) => (
    <Component {...(props as any)} ref={ref} />
  ));
  WrappedComponent.displayName = `Mirror(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
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
): ComponentType<P> {
  const WrappedComponent = forwardRef<HTMLElement, P>((props, ref) => {
    const { 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...rest } = props;

    return (
      <Component
        {...(rest as any)}
        ref={ref}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        role={role}
      />
    );
  });
  WrappedComponent.displayName = `WithAria(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  const WrappedComponent = forwardRef<HTMLElement, P>((props, ref) => {
    const { tabIndex, focusable, onFocus, onBlur, ...rest } = props;

    return (
      <Component
        {...(rest as any)}
        ref={ref}
        tabIndex={focusable ? tabIndex ?? 0 : -1}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  });
  WrappedComponent.displayName = `WithFocus(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  const WrappedComponent = forwardRef<HTMLElement, P>((props, ref) => {
    const { selected, checked, onChange, ...rest } = props;

    return (
      <Component
        {...(rest as any)}
        ref={ref}
        aria-selected={selected}
        aria-checked={checked}
        onChange={onChange}
      />
    );
  });
  WrappedComponent.displayName = `WithSelection(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent;
}
}
}
