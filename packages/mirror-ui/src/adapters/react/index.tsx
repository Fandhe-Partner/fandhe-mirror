import React, {
  forwardRef,
  useRef,
  useEffect,
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
  type ForwardedRef,
  type ReactElement,
  type FC
} from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import { setAriaAttributes, setAriaRole, type AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

type HOCProps<P extends MirrorComponent> = Omit<P, keyof RefAttributes<HTMLElement>> & {
  ref?: ForwardedRef<HTMLElement>;
};

type WrappedComponent<P extends MirrorComponent> = FC<HOCProps<P>> & {
  displayName?: string;
};

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef<HTMLElement, HOCProps<P>>((props, ref) => {
    const componentProps = { ...props, ref } as P;
    return <Component {...componentProps} />;
  });
  
  WrappedComponent.displayName = `Mirror(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as ComponentType<P>;
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
  const WrappedComponent = forwardRef<HTMLElement, HOCProps<P>>((props, ref) => {
    const { 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...rest } = props;

    return (
      <Component
        {...rest}
        ref={ref}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        role={role}
      />
    );
  });
  
  WrappedComponent.displayName = `WithAria(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as ComponentType<P>;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef<HTMLElement, HOCProps<P>>((props, ref) => {
    const { tabIndex, focusable, onFocus, onBlur, ...rest } = props;

    return (
      <Component
        {...rest}
        ref={ref}
        tabIndex={focusable ? tabIndex ?? 0 : -1}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  });
  
  WrappedComponent.displayName = `WithFocus(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as ComponentType<P>;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef<HTMLElement, HOCProps<P>>((props, ref) => {
    const { selected, checked, onChange, ...rest } = props;

    return (
      <Component
        {...rest}
        ref={ref}
        aria-selected={selected}
        aria-checked={checked}
        onChange={onChange}
      />
    );
  });
  
  WrappedComponent.displayName = `WithSelection(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as ComponentType<P>;
}
