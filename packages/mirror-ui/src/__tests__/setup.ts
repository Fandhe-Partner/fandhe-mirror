import { PropertySymbol } from "happy-dom";

// Get the browser window from the global document
const browserWindow =
  global.document[PropertySymbol.ownerWindow] ||
  global.document[PropertySymbol.window];

// Replace global timer functions with happy-dom implementations
global.setTimeout = browserWindow.setTimeout;
global.clearTimeout = browserWindow.clearTimeout;
global.setInterval = browserWindow.setInterval;
global.clearInterval = browserWindow.clearInterval;
global.requestAnimationFrame = browserWindow.requestAnimationFrame;
global.cancelAnimationFrame = browserWindow.cancelAnimationFrame;
global.queueMicrotask = browserWindow.queueMicrotask;
