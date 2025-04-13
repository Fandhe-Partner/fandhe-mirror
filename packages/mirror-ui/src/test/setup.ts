import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Window } from 'happy-dom';

expect.extend(matchers);

const window = new Window();
const document = window.document;

global.setTimeout = window.setTimeout.bind(window);
global.clearTimeout = window.clearTimeout.bind(window);
global.setInterval = window.setInterval.bind(window);
global.clearInterval = window.clearInterval.bind(window);
global.requestAnimationFrame = window.requestAnimationFrame.bind(window);
global.cancelAnimationFrame = window.cancelAnimationFrame.bind(window);
global.queueMicrotask = window.queueMicrotask.bind(window);

afterEach(() => {
  cleanup();
});
