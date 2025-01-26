import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { setAriaAttributes, setAriaRole, announce } from '../../utils/aria';

describe('ARIA utilities', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('setAriaAttributes', () => {
    it('should set ARIA attributes on an element', () => {
      setAriaAttributes(element, {
        label: 'Test Label',
        description: 'Test Description',
      });

      expect(element.getAttribute('aria-label')).toBe('Test Label');
      expect(element.getAttribute('aria-description')).toBe('Test Description');
    });

    it('should not set undefined attributes', () => {
      setAriaAttributes(element, {
        label: undefined,
        description: 'Test Description',
      });

      expect(element.hasAttribute('aria-label')).toBe(false);
      expect(element.getAttribute('aria-description')).toBe('Test Description');
    });
  });

  describe('setAriaRole', () => {
    it('should set ARIA role on an element', () => {
      setAriaRole(element, 'button');
      expect(element.getAttribute('role')).toBe('button');
    });
  });

  describe('announce', () => {
    let announcer: HTMLElement | null;

    afterEach(() => {
      if (announcer && announcer.parentNode) {
        announcer.parentNode.removeChild(announcer);
      }
    });

    it('should create an announcer element with the correct attributes', () => {
      announce('Test message');
      announcer = document.querySelector('[aria-live]');

      expect(announcer).not.toBeNull();
      expect(announcer?.getAttribute('aria-live')).toBe('polite');
      expect(announcer?.getAttribute('aria-atomic')).toBe('true');
      expect(announcer?.textContent).toBe('Test message');
    });

    it('should support assertive announcements', () => {
      announce('Important message', 'assertive');
      announcer = document.querySelector('[aria-live]');

      expect(announcer?.getAttribute('aria-live')).toBe('assertive');
    });
  });
});
