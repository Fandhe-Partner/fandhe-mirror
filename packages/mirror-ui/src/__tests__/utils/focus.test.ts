import { describe, it, expect, beforeEach } from 'vitest';
import { getFocusableElements, FocusTrap, FocusGuard } from '../../utils/focus';

describe('Focus utilities', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('getFocusableElements', () => {
    it('should return all focusable elements in container', () => {
      container.innerHTML = `
        <button>Button</button>
        <input type="text" />
        <a href="#">Link</a>
        <div tabindex="0">Focusable div</div>
        <div>Non-focusable div</div>
      `;

      const focusableElements = getFocusableElements(container);
      expect(focusableElements).toHaveLength(4);
    });

    it('should exclude disabled elements', () => {
      container.innerHTML = `
        <button disabled>Disabled button</button>
        <input type="text" disabled />
        <a href="#">Link</a>
      `;

      const focusableElements = getFocusableElements(container);
      expect(focusableElements).toHaveLength(1);
    });
  });

  describe('FocusTrap', () => {
    it('should trap focus within container', () => {
      container.innerHTML = `
        <button>First</button>
        <button>Middle</button>
        <button>Last</button>
      `;

      const focusTrap = new FocusTrap(container);
      focusTrap.activate();

      const buttons = container.querySelectorAll('button');
      const firstButton = buttons[0];
      const lastButton = buttons[2];

      // Focus last button and press Tab
      lastButton.focus();
      lastButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
      expect(document.activeElement).toBe(firstButton);

      // Focus first button and press Shift+Tab
      firstButton.focus();
      firstButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
      expect(document.activeElement).toBe(lastButton);

      focusTrap.deactivate();
    });
  });

  describe('FocusGuard', () => {
    it('should save and restore focus', () => {
      container.innerHTML = `
        <button>Original</button>
        <button>New</button>
      `;

      const [originalButton, newButton] = container.querySelectorAll('button');
      const focusGuard = new FocusGuard();

      originalButton.focus();
      focusGuard.save();
      
      newButton.focus();
      expect(document.activeElement).toBe(newButton);

      focusGuard.restore();
      expect(document.activeElement).toBe(originalButton);
    });
  });
});
