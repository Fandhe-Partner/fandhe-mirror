/**
 * ARIA role types based on WAI-ARIA specification
 */
export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'gridcell'
  | 'link'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'
  | 'progressbar'
  | 'radio'
  | 'scrollbar'
  | 'searchbox'
  | 'slider'
  | 'spinbutton'
  | 'switch'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'treeitem';

/**
 * Helper function to set ARIA attributes on an element
 */
export function setAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | boolean | number | undefined>
): void {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined) {
      element.setAttribute(`aria-${key}`, value.toString());
    }
  });
}

/**
 * Helper function to set ARIA role on an element
 */
export function setAriaRole(element: HTMLElement, role: AriaRole): void {
  element.setAttribute('role', role);
}

/**
 * Helper function to announce messages to screen readers
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.classList.add('mirror-sr-only');
  announcer.textContent = message;
  
  document.body.appendChild(announcer);
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 3000);
}
