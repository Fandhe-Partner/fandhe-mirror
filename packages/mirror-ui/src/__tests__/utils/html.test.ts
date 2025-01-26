import { describe, it, expect } from 'vitest';
import { createButton, createHeading, createList, createNavigation } from '../../utils/html';

describe('HTML utilities', () => {
  describe('createButton', () => {
    it('should create a button element with text', () => {
      const button = createButton('Click me');
      expect(button.tagName).toBe('BUTTON');
      expect(button.textContent).toBe('Click me');
    });

    it('should apply custom attributes', () => {
      const button = createButton('Click me', { id: 'test-button', className: 'primary' });
      expect(button.id).toBe('test-button');
      expect(button.className).toBe('primary');
    });
  });

  describe('createHeading', () => {
    it('should create heading elements of different levels', () => {
      const h1 = createHeading('Title', 1);
      const h3 = createHeading('Subtitle', 3);

      expect(h1.tagName).toBe('H1');
      expect(h1.textContent).toBe('Title');
      expect(h3.tagName).toBe('H3');
      expect(h3.textContent).toBe('Subtitle');
    });
  });

  describe('createList', () => {
    it('should create unordered list by default', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      const list = createList(items);

      expect(list.tagName).toBe('UL');
      expect(list.children).toHaveLength(3);
      expect(list.children[0].textContent).toBe('Item 1');
    });

    it('should create ordered list when specified', () => {
      const items = ['First', 'Second'];
      const list = createList(items, true);

      expect(list.tagName).toBe('OL');
      expect(list.children).toHaveLength(2);
    });
  });

  describe('createNavigation', () => {
    it('should create navigation with links', () => {
      const items = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' }
      ];
      const nav = createNavigation(items);

      expect(nav.tagName).toBe('NAV');
      const links = nav.querySelectorAll('a');
      expect(links).toHaveLength(2);
      expect(links[0].textContent).toBe('Home');
      expect(links[0].href).toContain('/');
      expect(links[1].textContent).toBe('About');
      expect(links[1].href).toContain('/about');
    });
  });
});
