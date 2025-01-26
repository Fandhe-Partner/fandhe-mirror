/**
 * Focus management utilities for Mirror UI components
 */

/**
 * Types of elements that can receive focus
 */
const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
] as const;

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(FOCUSABLE_ELEMENTS.join(','))
  ) as HTMLElement[];
}

/**
 * Trap focus within a container
 */
export class FocusTrap {
  private container: HTMLElement;
  private firstFocusable: HTMLElement | null = null;
  private lastFocusable: HTMLElement | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.updateFocusableElements();
  }

  private updateFocusableElements(): void {
    const focusableElements = getFocusableElements(this.container);
    this.firstFocusable = focusableElements[0] || null;
    this.lastFocusable = focusableElements[focusableElements.length - 1] || null;
  }

  activate(): void {
    this.container.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate(): void {
    this.container.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    if (!this.firstFocusable || !this.lastFocusable) return;

    if (event.shiftKey && document.activeElement === this.firstFocusable) {
      event.preventDefault();
      this.lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === this.lastFocusable) {
      event.preventDefault();
      this.firstFocusable.focus();
    }
  };
}

/**
 * Restore focus to a previously focused element
 */
export class FocusGuard {
  private previouslyFocused: HTMLElement | null = null;

  save(): void {
    this.previouslyFocused = document.activeElement as HTMLElement;
  }

  restore(): void {
    if (this.previouslyFocused && this.previouslyFocused.focus) {
      this.previouslyFocused.focus();
    }
  }
}
