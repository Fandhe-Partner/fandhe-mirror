import React, { forwardRef, useRef, useEffect, type ComponentType, type ForwardRefRenderFunction, type PropsWithoutRef, type ForwardRefExoticComponent, type RefAttributes, type ComponentProps } from 'react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../types/component';
import { setAriaAttributes, setAriaRole, type AriaRole } from '../../utils/aria';
import { FocusTrap, FocusGuard } from '../../utils/focus';

type MirrorComponentProps<P extends MirrorComponent> = Omit<P, keyof MirrorComponent> & MirrorComponent;
type FocusableComponentProps<P extends FocusableComponent> = Omit<P, keyof FocusableComponent> & FocusableComponent;
type SelectableComponentProps<P extends SelectableComponent> = Omit<P, keyof SelectableComponent> & SelectableComponent;

/**
 * HOC to create a React component from Mirror component interface
 */
export function createComponent<P extends MirrorComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  return forwardRef<HTMLElement, P>((props, ref) => (
    <Component {...props} ref={ref} />
  )) as ComponentType<P>;
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
  return forwardRef<HTMLElement, P>((props, ref) => {
    const { 'aria-label': ariaLabel, 'aria-description': ariaDescription, ...rest } = props;
    const mirrorProps: MirrorComponentProps<P> = {
      ...rest,
      'aria-label': ariaLabel,
      'aria-description': ariaDescription,
      role,
    } as MirrorComponentProps<P>;

    return <Component {...mirrorProps} ref={ref} />;
  }) as ComponentType<P>;
}

/**
 * HOC to add focus management to a component
 */
export function withFocus<P extends FocusableComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  return forwardRef<HTMLElement, P>((props, ref) => {
    const { tabIndex, focusable, onFocus, onBlur, ...rest } = props;
    const focusableProps: FocusableComponentProps<P> = {
      ...rest,
      tabIndex: focusable ? tabIndex ?? 0 : -1,
      onFocus,
      onBlur,
    } as FocusableComponentProps<P>;

    return <Component {...focusableProps} ref={ref} />;
  }) as ComponentType<P>;
}

/**
 * HOC to add selection support to a component
 */
export function withSelection<P extends SelectableComponent>(
  Component: ComponentType<P>
): ComponentType<P> {
  return forwardRef<HTMLElement, P>((props, ref) => {
    const { selected, checked, onChange, ...rest } = props;
    const selectableProps: SelectableComponentProps<P> = {
      ...rest,
      'aria-selected': selected,
      'aria-checked': checked,
      onChange,
    } as SelectableComponentProps<P>;

    return <Component {...selectableProps} ref={ref} />;
  }) as ComponentType<P>;
}
