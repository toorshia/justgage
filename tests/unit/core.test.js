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

    test('should handle min/max bounds in constructor', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 150,
        min: 0,
        max: 100,
      });

      // Value should be clamped to max
      assert.equal(gauge.getValue(), 100);
    });

    test('should handle min/max bounds in refresh', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 100,
      });

      gauge.refresh(150);
      assert.equal(gauge.getValue(), 100);

      gauge.refresh(-50);
      assert.equal(gauge.getValue(), 0);
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
});
