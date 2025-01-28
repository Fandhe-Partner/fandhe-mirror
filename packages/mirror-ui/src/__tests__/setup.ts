import { PropertySymbol } from "happy-dom";
import { expect } from 'vitest';
import '@testing-library/jest-dom';

const browserWindow =
  global.document[PropertySymbol.ownerWindow] ||
  global.document[PropertySymbol.window];

global.setTimeout = browserWindow.setTimeout;
global.clearTimeout = browserWindow.clearTimeout;
global.setInterval = browserWindow.setInterval;
global.clearInterval = browserWindow.clearInterval;
global.requestAnimationFrame = browserWindow.requestAnimationFrame;
global.cancelAnimationFrame = browserWindow.cancelAnimationFrame;
global.queueMicrotask = browserWindow.queueMicrotask;
