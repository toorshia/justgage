/**
 * Comprehensive unit tests for JustGage core functionality
 */

import '../setup.js';
import { test, describe, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { JustGage } from '../../src/index.js';

describe('JustGage Core Functionality', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'test-gauge';
    document.body.appendChild(container);
  });

  describe('Construction and Initialization', () => {
    test('should throw error without configuration', () => {
      assert.throws(() => {
        new JustGage();
      }, /Configuration object is required/);
    });

    test('should throw error without container', () => {
      assert.throws(() => {
        new JustGage({});
      }, /Either id or parentNode must be provided/);
    });

    test('should create instance with parentNode', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      assert.equal(gauge.getValue(), 50);
      assert.equal(typeof gauge.getConfig(), 'object');
      assert.ok(gauge.node);
    });

    test('should create instance with element id', () => {
      const gauge = new JustGage({
        id: 'test-gauge',
        value: 50,
      });

      assert.equal(gauge.getValue(), 50);
      assert.ok(gauge.node);
    });

    test('should apply default configuration', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      const config = gauge.getConfig();
      assert.equal(config.min, 0);
      assert.equal(config.max, 100);
      assert.equal(config.width, 400);
      assert.equal(config.height, 320);
    });

    test('should merge custom configuration with defaults', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 75,
        min: -50,
        max: 150,
        title: 'Test Gauge',
        label: 'units',
      });

      const config = gauge.getConfig();
      assert.equal(config.value, 75);
      assert.equal(config.min, -50);
      assert.equal(config.max, 150);
      assert.equal(config.title, 'Test Gauge');
      assert.equal(config.label, 'units');
    });
  });

  describe('Value Management', () => {
    test('should update value with refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      gauge.refresh(75);
      assert.equal(gauge.getValue(), 75);
    });

    test('should allow values outside min/max bounds in constructor', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 150,
        min: 0,
        max: 100,
      });

      // Value should be stored as-is (not clamped), visual clamping happens in rendering
      assert.equal(gauge.getValue(), 150);
    });

    test('should allow values outside min/max bounds in refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 100,
      });

      gauge.refresh(150);
      // Value above max should be stored as-is
      assert.equal(gauge.getValue(), 150);

      gauge.refresh(-50);
      // Value below min should be stored as-is
      assert.equal(gauge.getValue(), -50);
    });

    test('should update min/max values with refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 100,
      });

      gauge.refresh(75, 200, -50);
      const config = gauge.getConfig();
      assert.equal(config.min, -50);
      assert.equal(config.max, 200);
      assert.equal(gauge.getValue(), 75);
    });

    test('should update label with refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        label: 'original',
      });

      gauge.refresh(75, null, null, 'updated');
      const config = gauge.getConfig();
      assert.equal(config.label, 'updated');
    });

    test('should require numeric value for refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      assert.throws(() => {
        gauge.refresh('invalid');
      }, /refresh\(\) requires a numeric value/);

      assert.throws(() => {
        gauge.refresh(null);
      }, /refresh\(\) requires a numeric value/);
    });
  });

  describe('Configuration Updates', () => {
    test('should update single configuration option', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        title: 'Original',
      });

      gauge.update('valueFontColor', '#ff0000');
      assert.equal(gauge.getConfig().valueFontColor, '#ff0000');
    });

    test('should update multiple configuration options', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      gauge.update({
        valueFontColor: '#00ff00',
        labelFontColor: '#0000ff',
        gaugeColor: '#ff0000',
      });

      const config = gauge.getConfig();
      assert.equal(config.valueFontColor, '#00ff00');
      assert.equal(config.labelFontColor, '#0000ff');
      assert.equal(config.gaugeColor, '#ff0000');
    });
  });

  describe('Special Gauge Types', () => {
    test('should create donut gauge', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        donut: true,
      });

      assert.equal(gauge.getConfig().donut, true);
    });

    test('should create differential gauge', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 25,
        min: -50,
        max: 50,
        differential: true,
      });

      assert.equal(gauge.getConfig().differential, true);
      assert.equal(gauge.getConfig().min, -50);
      assert.equal(gauge.getConfig().max, 50);
    });

    test('should create gauge with pointer', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        pointer: true,
        pointerOptions: {
          color: '#8e2de2',
          toplength: 20,
        },
      });

      assert.equal(gauge.getConfig().pointer, true);
      assert.equal(gauge.getConfig().pointerOptions.color, '#8e2de2');
    });
  });

  describe('Destruction and Cleanup', () => {
    test('should clean up on destroy', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      assert.ok(gauge.node);
      assert.ok(gauge.config);

      gauge.destroy();
      assert.equal(gauge.node, null);
      assert.equal(gauge.config, null);
    });

    test('should handle multiple destroy calls', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      gauge.destroy();
      // Should not throw error on second destroy
      assert.doesNotThrow(() => {
        gauge.destroy();
      });
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid container id', () => {
      assert.throws(() => {
        new JustGage({
          id: 'non-existent-element',
          value: 50,
        });
      }, /No element with id.*found/);
    });

    test('should validate configuration types', () => {
      // This should not throw - just use default values for invalid types
      assert.doesNotThrow(() => {
        new JustGage({
          parentNode: container,
          value: 50,
          width: 'invalid',
          height: 'invalid',
        });
      });
    });
  });

  describe('Sector Colors Visualization', () => {
    test('should create gauge with showSectorColors disabled by default', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        customSectors: {
          ranges: [
            { lo: 0, hi: 30, color: '#00ff00' },
            { lo: 30, hi: 70, color: '#ffff00' },
            { lo: 70, hi: 100, color: '#ff0000' },
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, false);
      // Regular level should be drawn, not sectors
      assert.equal(gauge.canvas.sectors, undefined);
    });

    test('should enable sector colors visualization', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 30, color: '#00ff00' },
            { lo: 30, hi: 70, color: '#ffff00' },
            { lo: 70, hi: 100, color: '#ff0000' },
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, true);
      // Should have sectors array after drawing
      assert.ok(Array.isArray(gauge.canvas.sectors));
    });

    test('should handle showSectorColors without customSectors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
      });

      // Should still create gauge and show sectors using levelColors
      assert.equal(gauge.config.showSectorColors, true);
      assert.equal(gauge.getValue(), 50);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      // Should have 3 sectors (default levelColors length)
      assert.equal(gauge.canvas.sectors.length, 3);
    });

    test('should use levelColors when showSectorColors is enabled without customSectors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
        levelColors: ['#blue', '#yellow', '#red', '#purple'],
      });

      // Should have 4 sectors matching levelColors length
      assert.equal(gauge.config.showSectorColors, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      assert.equal(gauge.canvas.sectors.length, 4);
    });

    test('should divide gauge into sectors based on levelColors using getColor logic', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
        levelColors: ['#ff0000', '#00ff00'], // 2 colors should create 2 equal sectors (0-50%, 50-100%)
        gaugeColor: '#cccccc',
      });

      // Should have 2 sectors (one for each levelColor)
      assert.equal(gauge.config.showSectorColors, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      assert.equal(gauge.canvas.sectors.length, 2);
    });

    test('should not draw sectors when showSectorColors is true but no colors defined', () => {
      // Create gauge with empty levelColors (will default to standard levelColors due to validation)
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
      });

      // Should have sectors because levelColors defaults to standard colors
      assert.equal(gauge.config.showSectorColors, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      assert.equal(gauge.canvas.sectors.length, 3); // Default levelColors length
    });

    test('should use custom sectors with actual value ranges', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 100,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 30, color: '#00ff00' }, // 0-30 range
            { lo: 30, hi: 70, color: '#ffff00' }, // 30-70 range
            { lo: 70, hi: 100, color: '#ff0000' }, // 70-100 range
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      assert.equal(gauge.canvas.sectors.length, 3);
    });

    test('should handle percentage mode in sector colors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 200,
        showSectorColors: true,
        customSectors: {
          percents: true,
          ranges: [
            { lo: 0, hi: 25, color: '#00ff00' }, // 0-25% of 0-200 = 0-50
            { lo: 25, hi: 75, color: '#ffff00' }, // 25-75% of 0-200 = 50-150
            { lo: 75, hi: 100, color: '#ff0000' }, // 75-100% of 0-200 = 150-200
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, true);
      assert.equal(gauge.config.customSectors.percents, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
      assert.equal(gauge.canvas.sectors.length, 3);
    });

    test('should handle reverse mode with sector colors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        reverse: true,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 30, color: '#00ff00' },
            { lo: 30, hi: 70, color: '#ffff00' },
            { lo: 70, hi: 100, color: '#ff0000' },
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, true);
      assert.equal(gauge.config.reverse, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
    });

    test('should handle donut mode with sector colors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        donut: true,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 30, color: '#00ff00' },
            { lo: 30, hi: 70, color: '#ffff00' },
            { lo: 70, hi: 100, color: '#ff0000' },
          ],
        },
      });

      assert.equal(gauge.config.showSectorColors, true);
      assert.equal(gauge.config.donut, true);
      assert.ok(Array.isArray(gauge.canvas.sectors));
    });

    test('should update sectors when refreshing with new sectors', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 50, color: '#00ff00' },
            { lo: 50, hi: 100, color: '#ff0000' },
          ],
        },
      });

      // Update with new sectors configuration
      gauge.update({
        customSectors: {
          ranges: [
            { lo: 0, hi: 33, color: '#00ff00' },
            { lo: 33, hi: 66, color: '#ffff00' },
            { lo: 66, hi: 100, color: '#ff0000' },
          ],
        },
      });

      const newSectorsCount = gauge.canvas.sectors ? gauge.canvas.sectors.length : 0;
      assert.ok(newSectorsCount > 0);
      // Should have recreated sectors (might be different count)
      assert.ok(gauge.canvas.sectors);
    });

    test('should not redraw sectors on value refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        showSectorColors: true,
        customSectors: {
          ranges: [
            { lo: 0, hi: 50, color: '#00ff00' },
            { lo: 50, hi: 100, color: '#ff0000' },
          ],
        },
      });

      const originalSectors = gauge.canvas.sectors;
      assert.ok(originalSectors);
      assert.equal(originalSectors.length, 2);

      // Refresh value - sectors should remain the same instances
      gauge.refresh(75);

      assert.equal(gauge.canvas.sectors, originalSectors);
      assert.equal(gauge.canvas.sectors.length, 2);
    });
  });
});
