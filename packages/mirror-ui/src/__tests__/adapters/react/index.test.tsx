import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  createComponent,
  withAria,
  withFocus,
  withSelection
} from '../../../adapters/react';
import type { MirrorComponent, FocusableComponent, SelectableComponent } from '../../../types/component';

describe('React adapter', () => {
  afterEach(cleanup);

  it('should pass', () => {
    expect(1).toBe(1);
  });

  describe('createComponent', () => {
    it('should create a React component from Mirror interface', () => {
      interface TestProps extends MirrorComponent {
        text: string;
      }

      const TestComponent = createComponent<TestProps>((props, ref) => (
        <div ref={ref} className={props.className}>
          {props.text}
        </div>
      ));

      const { container } = render(
        <TestComponent text="Test" className="test-class" />
      );

      expect(container.firstChild).toHaveClass('test-class');
      expect(container.firstChild).toHaveTextContent('Test');
    });
  });

  describe('withAria', () => {
    it('should add ARIA attributes to component', () => {
      const BaseComponent = createComponent<MirrorComponent>((props, ref) => (
        <div ref={ref} {...props} />
      ));

      const AriaComponent = withAria(BaseComponent, 'button');
      const { container } = render(
        <AriaComponent
          aria-label="Test label"
          aria-description="Test description"
        />
      );

      expect(container.firstChild).toHaveAttribute('role', 'button');
      expect(container.firstChild).toHaveAttribute('aria-label', 'Test label');
      expect(container.firstChild).toHaveAttribute('aria-description', 'Test description');
    });
  });

  describe('withFocus', () => {
    it('should add focus management to component', async () => {
      const BaseComponent = createComponent<FocusableComponent>((props, ref) => (
        <div ref={ref} {...props} />
      ));

      const FocusComponent = withFocus(BaseComponent);
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      const { container } = render(
        <FocusComponent
          focusable
          tabIndex={0}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      );

      const element = container.firstChild as HTMLElement;
      await act(async () => {
        fireEvent.focus(element);
      });
      expect(onFocus).toHaveBeenCalled();

      await act(async () => {
        fireEvent.blur(element);
      });
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('withSelection', () => {
    it('should add selection support to component', async () => {
      const BaseComponent = createComponent<SelectableComponent>((props, ref) => (
        <div ref={ref} {...props} />
      ));

      const SelectionComponent = withSelection(BaseComponent);
      const onChange = vi.fn();

      const { container } = render(
        <SelectionComponent
          selected
          checked
          onChange={onChange}
        />
      );

      await act(async () => {
        await Promise.resolve();
      });

      expect(container.firstChild).toHaveAttribute('aria-selected', 'true');
      expect(container.firstChild).toHaveAttribute('aria-checked', 'true');

      const element = container.firstChild as HTMLElement;
      await act(async () => {
        fireEvent.click(element);
      });
      expect(onChange).toHaveBeenCalled();
    });
  });
});
