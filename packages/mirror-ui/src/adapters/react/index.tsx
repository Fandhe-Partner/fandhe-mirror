import React, {
  forwardRef,
  useRef,
  useEffect,
  type ComponentType,
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ElementType
} from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import type { AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

interface BaseProps {
  'aria-label'?: string;
  'aria-description'?: string;
  tabIndex?: number;
  focusable?: boolean;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  selected?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
}

type AsComponent = {
  as?: ElementType;
};

export type WrappedComponentProps<P> = P & BaseProps & AsComponent;

type WrappedComponent<P> = ForwardRefExoticComponent<P & BaseProps & AsComponent & RefAttributes<ElementType>> & {
  defaultProps?: Partial<P & BaseProps & AsComponent & RefAttributes<ElementType>>;
  displayName?: string;
};

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<ElementType, P & BaseProps & AsComponent>((props, ref) => {
    const { as: As = Component, ...rest } = props;
    const internalRef = useRef<ElementType | null>(null);
    const combinedRef = (node: ElementType | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<ElementType | null>).current = node;
      }
    };
    return <As {...(rest as unknown as P)} ref={combinedRef} />;
  });
  Wrapped.displayName = `Mirror(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped as WrappedComponent<P>;
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
  const Wrapped = forwardRef<ElementType, P & BaseProps & AsComponent>((props, ref) => {
    const { 
      as: As = Component,
      'aria-label': ariaLabel,
      'aria-description': ariaDescription,
      ...rest
    } = props;
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
  Wrapped.displayName = `MirrorAria(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped as WrappedComponent<P>;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<ElementType, P & BaseProps & AsComponent>((props, ref) => {
    const {
      as: As = Component,
      tabIndex,
      focusable,
      onFocus,
      onBlur,
      ...rest
    } = props;

    return (
      <As
        {...(rest as unknown as P)}
        ref={ref}
        tabIndex={focusable ? tabIndex ?? 0 : -1}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  });
  Wrapped.displayName = `MirrorFocus(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped as WrappedComponent<P>;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const Wrapped = forwardRef<ElementType, P & BaseProps & AsComponent>((props, ref) => {
    const {
      as: As = Component,
      selected,
      checked,
      onChange,
      ...rest
    } = props;

    const handleClick = (event: React.MouseEvent) => {
      if (onChange) {
        onChange(event);
      }
    };

    return (
      <As
        {...(rest as unknown as P)}
        ref={ref}
        aria-selected={selected}
        aria-checked={checked}
        onClick={handleClick}
      />
    );
  });
  Wrapped.displayName = `MirrorSelection(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped as WrappedComponent<P>;
}
