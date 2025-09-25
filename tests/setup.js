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
globalThis.navigator = dom.window.navigator;

// Add SVG namespace support
if (!globalThis.document.createElementNS) {
  globalThis.document.createElementNS = (namespace, tagName) => {
    const element = globalThis.document.createElement(tagName);
    element.namespaceURI = namespace;
    return element;
  };
}
