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
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

type ComponentProps<T extends ElementType> = T extends new (...args: any) => any
  ? Omit<PropsWithoutRef<InstanceType<T>>, keyof MirrorComponent>
  : T extends keyof JSX.IntrinsicElements
  ? PropsWithoutRef<JSX.IntrinsicElements[T]>
  : {};

type WrappedComponent<P> = {
  <C extends ElementType = 'div'>(
    props: PolymorphicComponentPropWithRef<C, P>
  ): ReactElement | null;
  displayName?: string;
};

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef(
    <C extends ElementType = 'div'>(
      { as, ...props }: PolymorphicComponentPropWithRef<C, P>,
      ref: PolymorphicRef<C>
    ) => {
      const Comp = as || Component;
      return <Comp {...props} ref={ref} />;
    }
  );
  
  WrappedComponent.displayName = `Mirror(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as WrappedComponent<P>;
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
  const WrappedComponent = forwardRef(
    <C extends ElementType = 'div'>(
      { as, 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...props }: PolymorphicComponentPropWithRef<C, P>,
      ref: PolymorphicRef<C>
    ) => {
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
    }
  );
  
  WrappedComponent.displayName = `WithAria(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as WrappedComponent<P>;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef(
    <C extends ElementType = 'div'>(
      { as, tabIndex, focusable, onFocus, onBlur, ...props }: PolymorphicComponentPropWithRef<C, P>,
      ref: PolymorphicRef<C>
    ) => {
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
    }
  );
  
  WrappedComponent.displayName = `WithFocus(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as WrappedComponent<P>;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): WrappedComponent<P> {
  const WrappedComponent = forwardRef(
    <C extends ElementType = 'div'>(
      { as, selected, checked, onChange, ...props }: PolymorphicComponentPropWithRef<C, P>,
      ref: PolymorphicRef<C>
    ) => {
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
    }
  );
  
  WrappedComponent.displayName = `WithSelection(${Component.displayName || Component.name || 'Component'})`;
  return WrappedComponent as WrappedComponent<P>;
}
