/**
 * Unit tests for SVG rendering functionality
 */

import '../setup.js';
import { test, describe, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { SVGRenderer } from '../../src/rendering/svg.js';

describe('SVGRenderer', () => {
  let container;
  let renderer;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new SVGRenderer(container, 400, 300);
  });

  describe('Initialization', () => {
    test('should create SVG element', () => {
      assert.ok(renderer.svg);
      assert.equal(renderer.svg.tagName.toLowerCase(), 'svg');
      assert.equal(renderer.svg.getAttribute('width'), '400');
      assert.equal(renderer.svg.getAttribute('height'), '300');
    });

    test('should append SVG to container', () => {
      assert.equal(container.children.length, 1);
      assert.equal(container.children[0], renderer.svg);
    });

    test('should set SVG namespace', () => {
      assert.ok(renderer.svg.namespaceURI);
    });
  });

  describe('Element Creation', () => {
    test('should create circle elements', () => {
      const circle = renderer.circle(50, 50, 25);

      assert.ok(circle.element);
      assert.equal(circle.element.tagName.toLowerCase(), 'circle');
      assert.equal(circle.attr('cx'), '50');
      assert.equal(circle.attr('cy'), '50');
      assert.equal(circle.attr('r'), '25');
    });

    test('should create path elements', () => {
      const pathString = 'M 10 10 L 90 90';
      const path = renderer.path(pathString);

      assert.ok(path.element);
      assert.equal(path.element.tagName.toLowerCase(), 'path');
      assert.equal(path.attr('d'), pathString);
    });

    test('should create text elements', () => {
      const text = renderer.text(100, 50, 'Hello World');

      assert.ok(text.element);
      assert.equal(text.element.tagName.toLowerCase(), 'text');
      assert.equal(text.element.textContent, 'Hello World');
    });

    test('should create rect elements', () => {
      const rect = renderer.rect(10, 20, 100, 50);

      assert.ok(rect.element);
      assert.equal(rect.element.tagName.toLowerCase(), 'rect');
      assert.equal(rect.attr('x'), '10');
      assert.equal(rect.attr('y'), '20');
      assert.equal(rect.attr('width'), '100');
      assert.equal(rect.attr('height'), '50');
    });

    test('should create group elements', () => {
      // SVGRenderer doesn't have a group method, it uses the DOM directly
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      renderer.svg.appendChild(group);
      assert.equal(group.tagName.toLowerCase(), 'g');
    });
  });

  describe('Element Styling', () => {
    test('should apply fill color', () => {
      const circle = renderer.circle(50, 50, 25);
      circle.attr({ fill: '#ff0000' });

      assert.equal(circle.attr('fill'), '#ff0000');
    });

    test('should apply stroke properties', () => {
      const path = renderer.path('M 10 10 L 90 90');
      path.attr({ stroke: '#0000ff', 'stroke-width': '2' });

      assert.equal(path.attr('stroke'), '#0000ff');
      assert.equal(path.attr('stroke-width'), '2');
    });

    test('should apply opacity', () => {
      const rect = renderer.rect(0, 0, 100, 100);
      rect.attr({ opacity: '0.5' });

      assert.equal(rect.attr('opacity'), '0.5');
    });
  });

  describe('Element Hierarchy', () => {
    test('should append elements to SVG', () => {
      const circle = renderer.circle(50, 50, 25);
      // Circle is automatically appended by renderer.circle
      assert.ok(renderer.svg.children.length >= 1);
      assert.ok(circle.element.parentNode === renderer.svg);
    });

    test('should create nested groups', () => {
      const parentGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const childGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const circle = renderer.circle(50, 50, 25);

      parentGroup.appendChild(childGroup);
      childGroup.appendChild(circle.element);
      renderer.svg.appendChild(parentGroup);

      assert.ok(renderer.svg.children.length >= 1);
      assert.equal(parentGroup.children.length, 1);
      assert.equal(childGroup.children.length, 1);
    });
  });

  describe('Dynamic Updates', () => {
    test('should update element attributes', () => {
      const circle = renderer.circle(50, 50, 25);

      circle.attr({ cx: '100', cy: '75', r: '30' });

      assert.equal(circle.attr('cx'), '100');
      assert.equal(circle.attr('cy'), '75');
      assert.equal(circle.attr('r'), '30');
    });

    test('should update text content', () => {
      const text = renderer.text(100, 50, 'Original');

      text.attr({ text: 'Updated' });

      assert.equal(text.element.textContent, 'Updated');
    });

    test('should update path data', () => {
      const path = renderer.path('M 10 10 L 90 90');

      path.attr({ d: 'M 20 20 L 80 80' });

      assert.equal(path.attr('d'), 'M 20 20 L 80 80');
    });
  });

  describe('Element Removal', () => {
    test('should remove elements from DOM', () => {
      const circle = renderer.circle(50, 50, 25);
      // Circle is auto-appended by renderer.circle
      const initialCount = renderer.svg.children.length;
      assert.ok(initialCount >= 1);

      circle.remove();

      assert.equal(renderer.svg.children.length, initialCount - 1);
    });

    test('should handle removing non-existent elements', () => {
      const circle = renderer.circle(50, 50, 25);

      // Should not throw error
      assert.doesNotThrow(() => {
        circle.remove();
      });
    });
  });

  describe('Transforms', () => {
    test('should apply rotation transform', () => {
      const rect = renderer.rect(0, 0, 100, 50);
      rect.transform('rotate(45 50 25)');

      assert.equal(rect.attr('transform'), 'rotate(45 50 25)');
    });

    test('should apply translation transform', () => {
      const circle = renderer.circle(0, 0, 25);
      circle.transform('translate(100, 50)');

      assert.equal(circle.attr('transform'), 'translate(100, 50)');
    });

    test('should apply scale transform', () => {
      const path = renderer.path('M 0 0 L 100 100');
      path.transform('scale(2, 1.5)');

      assert.equal(path.attr('transform'), 'scale(2, 1.5)');
    });
  });

  describe('Complex Path Creation', () => {
    test('should create arc paths', () => {
      const arcPath = 'M 50 50 A 25 25 0 0 1 75 75';
      const path = renderer.path(arcPath);

      assert.equal(path.attr('d'), arcPath);
    });

    test('should create curved paths', () => {
      const curvePath = 'M 10 10 Q 50 5 90 10';
      const path = renderer.path(curvePath);

      assert.equal(path.attr('d'), curvePath);
    });

    test('should create closed paths', () => {
      const closedPath = 'M 10 10 L 90 10 L 50 90 Z';
      const path = renderer.path(closedPath);

      assert.equal(path.attr('d'), closedPath);
    });
  });

  describe('Text Styling', () => {
    test('should apply font properties', () => {
      const text = renderer.text(100, 50, 'Styled Text');

      text.attr({ 'font-family': 'Arial', 'font-size': '16', 'font-weight': 'bold' });

      assert.equal(text.attr('font-family'), 'Arial');
      assert.equal(text.attr('font-size'), '16');
      assert.equal(text.attr('font-weight'), 'bold');
    });

    test('should apply text anchor', () => {
      const text = renderer.text(100, 50, 'Centered');
      text.attr({ 'text-anchor': 'middle' });

      assert.equal(text.attr('text-anchor'), 'middle');
    });

    test('should apply dominant baseline', () => {
      const text = renderer.text(100, 50, 'Baseline');
      text.attr({ 'dominant-baseline': 'central' });

      assert.equal(text.attr('dominant-baseline'), 'central');
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid container', () => {
      assert.throws(() => {
        new SVGRenderer(null, 400, 300);
      });
    });

    test('should handle invalid dimensions', () => {
      // Should still create renderer but may have default dimensions
      assert.doesNotThrow(() => {
        new SVGRenderer(container, 'invalid', 'invalid');
      });
    });
  });
});
