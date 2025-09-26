/**
 * Test setup - Initialize DOM environment for Node.js testing
 */

import { JSDOM } from 'jsdom';

// Create a DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable',
});

// Make DOM available globally
globalThis.document = dom.window.document;
globalThis.window = dom.window;

// Handle navigator property which is read-only in Node.js 22+
try {
  globalThis.navigator = dom.window.navigator;
} catch {
  // If navigator is read-only, use Object.defineProperty
  Object.defineProperty(globalThis, 'navigator', {
    value: dom.window.navigator,
    writable: true,
    configurable: true,
  });
}

// Add requestAnimationFrame polyfill for Node.js testing
globalThis.requestAnimationFrame = callback => {
  return setTimeout(callback, 16); // ~60fps
};

globalThis.cancelAnimationFrame = id => {
  clearTimeout(id);
};

// Add SVG namespace support
if (!globalThis.document.createElementNS) {
  globalThis.document.createElementNS = (namespace, tagName) => {
    const element = globalThis.document.createElement(tagName);
    element.namespaceURI = namespace;
    return element;
  };
}
