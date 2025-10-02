/**
 * Tests for title positioning functionality
 */

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { JustGage } from '../../src/core/JustGage.js';
import '../setup.js';

describe('Title Positioning', () => {
  let container;

  beforeEach(() => {
    // Create a container element for testing
    container = document.createElement('div');
    container.id = 'test-gauge-container';
    container.style.width = '400px';
    container.style.height = '300px';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  it('should render title above regular gauge', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Test Gauge',
      width: 400,
      height: 300,
    });

    const titleElement = container.querySelector('text');
    assert.ok(titleElement, 'Title element should be created');
    assert.strictEqual(titleElement.textContent, 'Test Gauge', 'Title text should match');

    // Check that title is positioned above the gauge using new positioning logic
    const titleY = parseFloat(titleElement.getAttribute('y'));
    const { dy, widgetH } = gauge._calculateGaugeGeometry();
    const expectedY = dy + widgetH / 6.4; // New positioning logic for 'above'

    // Title should be positioned using legacy-compatible positioning
    assert.ok(Math.abs(titleY - expectedY) < 1, 'Title should be positioned using new logic');
    assert.ok(titleY > dy, 'Title should be positioned within widget bounds');

    gauge.destroy();
  });

  it('should render title above donut gauge', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Donut Gauge',
      donut: true,
      width: 300,
      height: 300,
    });

    const titleElement = container.querySelector('text');
    assert.ok(titleElement, 'Title element should be created');
    assert.strictEqual(titleElement.textContent, 'Donut Gauge', 'Title text should match');

    // Check that title is positioned above the donut using legacy positioning logic
    const titleY = parseFloat(titleElement.getAttribute('y'));
    const expectedY = -5; // Legacy donut title positioning logic

    // Title should be positioned using legacy-compatible positioning
    assert.ok(Math.abs(titleY - expectedY) < 1, 'Title should be positioned using legacy logic');

    gauge.destroy();
  });

  it('should center title horizontally', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Centered Title',
      width: 400,
      height: 300,
    });

    const titleElement = container.querySelector('text');
    const titleX = parseFloat(titleElement.getAttribute('x'));
    const { cx } = gauge._calculateGaugeGeometry();

    assert.strictEqual(titleX, cx, 'Title should be centered horizontally');
    assert.strictEqual(
      titleElement.getAttribute('text-anchor'),
      'middle',
      'Title should have middle text anchor'
    );

    gauge.destroy();
  });

  it('should not render title when not provided', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      // No title provided
      width: 400,
      height: 300,
    });

    // There might be other text elements (value, labels), so check specifically for title
    assert.strictEqual(gauge.canvas.title, null, 'Title canvas element should be null');

    gauge.destroy();
  });

  it('should update title text via update method', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Original Title',
      width: 400,
      height: 300,
    });

    // Update title
    gauge.update('title', 'Updated Title');

    const titleElement = gauge.canvas.title.element;
    assert.strictEqual(titleElement.textContent, 'Updated Title', 'Title should be updated');

    gauge.destroy();
  });

  it('should create title when updating from empty', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      // No initial title
      width: 400,
      height: 300,
    });

    assert.strictEqual(gauge.canvas.title, null, 'Initial title should be null');

    // Add title via update
    gauge.update('title', 'New Title');

    assert.ok(gauge.canvas.title, 'Title should be created');
    assert.strictEqual(
      gauge.canvas.title.element.textContent,
      'New Title',
      'Title text should match'
    );

    gauge.destroy();
  });

  it('should update title color via update method', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Colored Title',
      titleFontColor: '#000000',
      width: 400,
      height: 300,
    });

    // Update title color
    gauge.update('titleFontColor', '#ff0000');

    const titleElement = gauge.canvas.title.element;
    assert.strictEqual(
      titleElement.getAttribute('fill'),
      '#ff0000',
      'Title color should be updated'
    );

    gauge.destroy();
  });

  it('should handle title with relative gauge sizing', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Relative Title',
      relativeGaugeSize: true,
    });

    const titleElement = container.querySelector('text');
    assert.ok(titleElement, 'Title element should be created with relative sizing');
    assert.strictEqual(titleElement.textContent, 'Relative Title', 'Title text should match');

    // Title should still be positioned correctly with relative sizing
    const titleY = parseFloat(titleElement.getAttribute('y'));
    assert.ok(titleY > 0, 'Title should have positive Y position');

    gauge.destroy();
  });

  it('should apply title font properties correctly', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      title: 'Styled Title',
      titleFontFamily: 'Arial',
      titleFontColor: '#333333',
      titleFontSize: 20,
      titleFontWeight: 'bold',
      width: 400,
      height: 300,
    });

    const titleElement = gauge.canvas.title.element;
    assert.strictEqual(
      titleElement.getAttribute('font-family'),
      'Arial',
      'Font family should match'
    );
    assert.strictEqual(titleElement.getAttribute('fill'), '#333333', 'Font color should match');
    assert.strictEqual(
      titleElement.getAttribute('font-weight'),
      'bold',
      'Font weight should match'
    );

    gauge.destroy();
  });
});
