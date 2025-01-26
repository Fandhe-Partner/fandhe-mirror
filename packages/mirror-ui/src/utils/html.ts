/**
 * Helper functions for generating semantic HTML elements
 */

type HTMLAttributes = Partial<HTMLElement>;

/**
 * Create a semantic button element
 */
export function createButton(
  text: string,
  attributes: HTMLAttributes = {}
): HTMLButtonElement {
  const button = document.createElement('button');
  button.textContent = text;
  Object.assign(button, attributes);
  return button;
}

/**
 * Create a semantic heading element
 */
export function createHeading(
  text: string,
  level: 1 | 2 | 3 | 4 | 5 | 6,
  attributes: HTMLAttributes = {}
): HTMLHeadingElement {
  const heading = document.createElement(`h${level}`);
  heading.textContent = text;
  Object.assign(heading, attributes);
  return heading;
}

/**
 * Create a semantic list element
 */
export function createList(
  items: string[],
  ordered = false,
  attributes: HTMLAttributes = {}
): HTMLElement {
  const list = document.createElement(ordered ? 'ol' : 'ul');
  Object.assign(list, attributes);
  
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }
  
  return list;
}

/**
 * Create a semantic navigation element
 */
export function createNavigation(
  items: Array<{ text: string; href: string }>,
  attributes: HTMLAttributes = {}
): HTMLElement {
  const nav = document.createElement('nav');
  Object.assign(nav, attributes);
  
  const list = document.createElement('ul');
  for (const item of items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = item.text;
    a.href = item.href;
    li.appendChild(a);
    list.appendChild(li);
  }
  
  nav.appendChild(list);
  return nav;
}
