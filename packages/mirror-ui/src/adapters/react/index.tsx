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
  type FC,
  type ElementType
} from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import { setAriaAttributes, setAriaRole, type AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends ElementType,
  Props = {}
> = PropsWithoutRef<Props & AsProp<C>> &
  Omit<PropsWithoutRef<ComponentProps<C>>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends ElementType> = ComponentProps<C>['ref'];

type PolymorphicComponentPropWithRef<
  C extends ElementType,
  Props = {}
> = PropsWithoutRef<Props & AsProp<C>> &
  Omit<ComponentProps<C>, keyof (Props & AsProp<C>)> & { ref?: PolymorphicRef<C> };

type ComponentProps<T extends ElementType> = T extends new (...args: any) => any
  ? InstanceType<T>
  : T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T]
  : {};

type WrappedComponent<P> = ForwardRefExoticComponent<P & { as?: ElementType }> & {
  displayName?: string;
};

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef(({ as, ...props }: P & { as?: ElementType }, ref) => {
    const Comp = as || Component;
    return <Comp {...props} ref={ref} />;
  }) as WrappedComponent<P>;
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
  return forwardRef(({ as, 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...props }: P & { as?: ElementType }, ref) => {
    const Comp = as || Component;
    return (
      <Comp
        {...props}
        ref={ref}
        aria-label={ariaLabel}
        aria-description={ariaDescription}
        role={role}
      />
    );
  }) as WrappedComponent<P>;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef(({ as, tabIndex, focusable, onFocus, onBlur, ...props }: P & { as?: ElementType }, ref) => {
    const Comp = as || Component;
    return (
      <Comp
        {...props}
        ref={ref}
        tabIndex={focusable ? tabIndex ?? 0 : -1}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }) as WrappedComponent<P>;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  return forwardRef(({ as, selected, checked, onChange, ...props }: P & { as?: ElementType }, ref) => {
    const Comp = as || Component;
    return (
      <Comp
        {...props}
        ref={ref}
        aria-selected={selected}
        aria-checked={checked}
        onChange={onChange}
      />
    );
  }) as WrappedComponent<P>;
}
