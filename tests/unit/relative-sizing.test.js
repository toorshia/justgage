/**
 * Tests for relative gauge sizing functionality
 */

import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { JustGage } from '../../src/core/JustGage.js';
import '../setup.js';

describe('Relative Gauge Sizing', () => {
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

  it('should create gauge with fixed sizing by default', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      width: 400,
      height: 300,
      relativeGaugeSize: false,
    });

    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG should be created');
    assert.strictEqual(svg.getAttribute('width'), '400', 'SVG width should be fixed');
    assert.strictEqual(svg.getAttribute('height'), '300', 'SVG height should be fixed');
    assert.strictEqual(
      svg.getAttribute('viewBox'),
      '0 0 400 300',
      'viewBox should use actual dimensions'
    );

    gauge.destroy();
  });

  it('should create gauge with relative sizing when enabled', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      relativeGaugeSize: true,
    });

    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG should be created');
    assert.strictEqual(svg.getAttribute('width'), '100%', 'SVG width should be percentage');
    assert.strictEqual(svg.getAttribute('height'), '100%', 'SVG height should be percentage');
    assert.strictEqual(
      svg.getAttribute('viewBox'),
      '0 0 200 100',
      'viewBox should use standard dimensions for regular gauge'
    );
    assert.strictEqual(
      svg.getAttribute('preserveAspectRatio'),
      'xMidYMid meet',
      'preserveAspectRatio should be set for responsive scaling'
    );

    gauge.destroy();
  });

  it('should create donut gauge with correct relative sizing', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      donut: true,
      relativeGaugeSize: true,
    });

    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG should be created');
    assert.strictEqual(svg.getAttribute('width'), '100%', 'SVG width should be percentage');
    assert.strictEqual(svg.getAttribute('height'), '100%', 'SVG height should be percentage');
    assert.strictEqual(
      svg.getAttribute('viewBox'),
      '0 0 200 200',
      'viewBox should use square dimensions for donut gauge'
    );
    assert.strictEqual(
      svg.getAttribute('preserveAspectRatio'),
      'xMidYMid meet',
      'preserveAspectRatio should be set for responsive scaling'
    );

    gauge.destroy();
  });

  it('should calculate geometry using viewBox dimensions for relative sizing', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      relativeGaugeSize: true,
    });

    // Access private method for testing
    const geometry = gauge._calculateGaugeGeometry();

    // For regular gauge with relativeGaugeSize, viewBox is 200x100
    // So widget dimensions should be calculated based on that
    assert.ok(geometry.widgetW > 0, 'Widget width should be positive');
    assert.ok(geometry.widgetH > 0, 'Widget height should be positive');
    assert.ok(geometry.cx >= 0, 'Center X should be valid');
    assert.ok(geometry.cy >= 0, 'Center Y should be valid');
    assert.ok(geometry.outerRadius > 0, 'Outer radius should be positive');
    assert.ok(geometry.innerRadius > 0, 'Inner radius should be positive');
    assert.ok(
      geometry.innerRadius < geometry.outerRadius,
      'Inner radius should be less than outer radius'
    );

    gauge.destroy();
  });

  it('should calculate donut geometry using viewBox dimensions for relative sizing', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      donut: true,
      relativeGaugeSize: true,
    });

    // Access private method for testing
    const geometry = gauge._calculateGaugeGeometry();

    // For donut gauge with relativeGaugeSize, viewBox is 200x200
    // Widget should be square
    assert.strictEqual(geometry.widgetW, geometry.widgetH, 'Donut widget should be square');
    assert.ok(geometry.widgetW > 0, 'Widget width should be positive');
    assert.ok(geometry.cx >= 0, 'Center X should be valid');
    assert.ok(geometry.cy >= 0, 'Center Y should be valid');

    gauge.destroy();
  });

  it('should maintain configuration compatibility with legacy implementation', () => {
    // Test that the same configuration options work as in legacy version
    const config = {
      id: 'test-gauge-container',
      value: 67,
      min: 0,
      max: 100,
      title: 'Relative Gauge',
      label: 'Performance',
      relativeGaugeSize: true,
      donut: false,
      gaugeWidthScale: 1,
      levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
    };

    const gauge = new JustGage(config);

    assert.strictEqual(gauge.config.relativeGaugeSize, true, 'relativeGaugeSize should be enabled');
    assert.strictEqual(gauge.config.value, 67, 'Value should be set correctly');
    assert.strictEqual(gauge.config.title, 'Relative Gauge', 'Title should be set correctly');

    const svg = container.querySelector('svg');
    assert.ok(svg, 'SVG should be created');
    assert.strictEqual(svg.getAttribute('width'), '100%', 'Width should be percentage');
    assert.strictEqual(svg.getAttribute('height'), '100%', 'Height should be percentage');

    gauge.destroy();
  });

  it('should handle refresh with relative sizing', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      relativeGaugeSize: true,
    });

    // Refresh should work with relative sizing
    gauge.refresh(75);
    assert.strictEqual(gauge.config.value, 75, 'Value should be updated');

    // SVG should still have percentage dimensions
    const svg = container.querySelector('svg');
    assert.strictEqual(
      svg.getAttribute('width'),
      '100%',
      'Width should remain percentage after refresh'
    );
    assert.strictEqual(
      svg.getAttribute('height'),
      '100%',
      'Height should remain percentage after refresh'
    );

    gauge.destroy();
  });

  it('should handle custom width/height with relativeGaugeSize disabled', () => {
    const gauge = new JustGage({
      id: 'test-gauge-container',
      value: 50,
      min: 0,
      max: 100,
      width: 300,
      height: 200,
      relativeGaugeSize: false,
    });

    const svg = container.querySelector('svg');
    assert.strictEqual(svg.getAttribute('width'), '300', 'Custom width should be used');
    assert.strictEqual(svg.getAttribute('height'), '200', 'Custom height should be used');
    assert.strictEqual(
      svg.getAttribute('viewBox'),
      '0 0 300 200',
      'viewBox should match custom dimensions'
    );

    gauge.destroy();
  });
});
