import { PropertySymbol } from "happy-dom";
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { act } from '@testing-library/react';

configure({ 
  asyncUtilTimeout: 1000,
  eventWrapper: async (cb: () => unknown) => {
    let result: unknown;
    await act(async () => {
      result = await cb();
    });
    return result;
  }
});

const browserWindow =
  global.document[PropertySymbol.openerWindow] ||
  global.document[PropertySymbol.window];

global.setTimeout = browserWindow.setTimeout.bind(browserWindow);
global.clearTimeout = browserWindow.clearTimeout.bind(browserWindow);
global.setInterval = browserWindow.setInterval.bind(browserWindow);
global.clearInterval = browserWindow.clearInterval.bind(browserWindow);
global.requestAnimationFrame = browserWindow.requestAnimationFrame.bind(browserWindow);
global.cancelAnimationFrame = browserWindow.cancelAnimationFrame.bind(browserWindow);
global.queueMicrotask = browserWindow.queueMicrotask.bind(browserWindow);
