/**
 * Integration tests for JustGage functionality
 */

import '../setup.js';
import { test, describe, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { JustGage } from '../../src/index.js';

describe('JustGage Integration Tests', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'integration-test-gauge';
    document.body.appendChild(container);
  });

  describe('Animation Integration', () => {
    test('should animate on initial creation with animation time > 0', (t, done) => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        startAnimationTime: 100,
        onAnimationEnd: () => {
          assert.equal(gauge.getValue(), 50);
          done();
        },
      });

      // Animation should be active initially
      assert.ok(gauge.animator);
    });
    test('should skip animation when startAnimationTime is 0', () => {
      let animationEndCalled = false;

      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        startAnimationTime: 0,
        onAnimationEnd: () => {
          animationEndCalled = true;
        },
      });

      // Should immediately show final value
      assert.equal(gauge.getValue(), 50);
      // Animation end callback should be called immediately
      assert.equal(animationEndCalled, true);
    });

    test('should animate on refresh with animation time > 0', (t, done) => {
      const gauge = new JustGage({
        parentNode: container,
        value: 30,
        startAnimationTime: 0, // No initial animation
        refreshAnimationTime: 100,
      });

      // Set up animation end callback for refresh
      gauge.config.onAnimationEnd = () => {
        assert.equal(gauge.getValue(), 80);
        done();
      };

      // Trigger refresh with animation
      gauge.refresh(80);
    });

    test('should skip refresh animation when refreshAnimationTime is 0', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 30,
        startAnimationTime: 0,
        refreshAnimationTime: 0,
      });

      gauge.refresh(80);
      // Should immediately update to new value
      assert.equal(gauge.getValue(), 80);
    });
  });

  describe('Complex Configuration Integration', () => {
    test('should handle donut gauge with all features', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 75,
        min: 0,
        max: 100,
        donut: true,
        donutStartAngle: 45,
        title: 'Donut Gauge',
        label: 'Progress',
        levelColors: ['#00ff00', '#ffff00', '#ff0000'],
        hideMinMax: true,
        humanFriendly: true,
        formatNumber: true,
      });

      const config = gauge.getConfig();
      assert.equal(config.donut, true);
      assert.equal(config.donutStartAngle, 45);
      assert.equal(config.title, 'Donut Gauge');
      assert.equal(config.hideMinMax, true);
    });

    test('should handle pointer gauge with custom options', () => {
      const pointerOptions = {
        color: '#8e2de2',
        toplength: 20,
        bottomlength: 30,
        bottomwidth: 6,
      };

      const gauge = new JustGage({
        parentNode: container,
        value: 60,
        pointer: true,
        pointerOptions,
        targetLine: 75,
        targetLineColor: '#ff0000',
      });

      const config = gauge.getConfig();
      assert.equal(config.pointer, true);
      assert.deepEqual(config.pointerOptions, pointerOptions);
      assert.equal(config.targetLine, 75);
      assert.equal(config.targetLineColor, '#ff0000');
    });

    test('should handle differential gauge', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 25,
        min: -50,
        max: 50,
        differential: true,
        levelColors: ['#ff0000', '#ffff00', '#00ff00'],
      });

      const config = gauge.getConfig();
      assert.equal(config.differential, true);
      assert.equal(config.min, -50);
      assert.equal(config.max, 50);
      assert.equal(gauge.getValue(), 25);
    });

    test('should handle custom sectors', () => {
      const customSectors = [
        { lo: 0, hi: 30, color: '#ff0000' },
        { lo: 30, hi: 70, color: '#ffff00' },
        { lo: 70, hi: 100, color: '#00ff00' },
      ];

      const gauge = new JustGage({
        parentNode: container,
        value: 85,
        customSectors,
        noGradient: true,
      });

      const config = gauge.getConfig();
      assert.deepEqual(config.customSectors, customSectors);
      assert.equal(config.noGradient, true);
    });
  });

  describe('Dynamic Updates Integration', () => {
    test('should handle multiple consecutive refreshes', (t, done) => {
      const gauge = new JustGage({
        parentNode: container,
        value: 20,
        refreshAnimationTime: 50,
      });

      let refreshCount = 0;
      const values = [40, 60, 80];

      const doRefresh = () => {
        if (refreshCount < values.length) {
          gauge.refresh(values[refreshCount]);
          refreshCount++;

          if (refreshCount === values.length) {
            // Wait a bit for final animation to complete
            setTimeout(() => {
              assert.equal(gauge.getValue(), 80);
              done();
            }, 100);
          } else {
            setTimeout(doRefresh, 60);
          }
        }
      };

      doRefresh();
    });

    test('should handle refresh with min/max updates', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        min: 0,
        max: 100,
      });

      // Update value with new min/max
      gauge.refresh(150, 200, -50, 'Updated Label');

      const config = gauge.getConfig();
      assert.equal(config.min, -50);
      assert.equal(config.max, 200);
      assert.equal(config.label, 'Updated Label');
      assert.equal(gauge.getValue(), 150);
    });

    test('should handle configuration updates', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        title: 'Original',
        gaugeColor: '#edebeb',
      });

      gauge.update({
        valueFontColor: '#ff0000',
        gaugeColor: '#ff0000',
        levelColors: ['#00ff00', '#ffff00', '#ff0000'],
      });

      const config = gauge.getConfig();
      assert.equal(config.valueFontColor, '#ff0000');
      assert.equal(config.gaugeColor, '#ff0000');
      assert.deepEqual(config.levelColors, ['#00ff00', '#ffff00', '#ff0000']);
    });
  });

  describe('Value Formatting Integration', () => {
    test('should format numbers with humanFriendly option', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 15000,
        max: 100000,
        humanFriendly: true,
      });

      assert.equal(gauge.getValue(), 15000);
      // The formatting is applied during rendering, not to the stored value
    });

    test('should format numbers with formatNumber option', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 85.67,
        max: 100,
        decimals: 2,
        formatNumber: true,
      });

      assert.equal(gauge.getValue(), 85.67);
    });

    test('should handle displayRemaining option', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 30,
        max: 100,
        displayRemaining: true,
      });

      const config = gauge.getConfig();
      assert.equal(config.displayRemaining, true);
      assert.equal(gauge.getValue(), 30);
    });

    test('should apply custom symbol', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 75,
        symbol: '%',
        decimals: 1,
      });

      const config = gauge.getConfig();
      assert.equal(config.symbol, '%');
      assert.equal(config.decimals, 1);
    });
  });

  describe('Counter Integration', () => {
    test('should enable counter mode', (t, done) => {
      const gauge = new JustGage({
        parentNode: container,
        value: 0,
        counter: true,
        startAnimationTime: 100,
        onAnimationEnd: () => {
          assert.equal(gauge.getValue(), 50);
          done();
        },
      });

      gauge.refresh(50);
    });
  });

  describe('Hide/Show Features Integration', () => {
    test('should hide value when hideValue is true', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        hideValue: true,
      });

      const config = gauge.getConfig();
      assert.equal(config.hideValue, true);
    });

    test('should hide min/max when hideMinMax is true', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        hideMinMax: true,
      });

      const config = gauge.getConfig();
      assert.equal(config.hideMinMax, true);
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle destroyed gauge operations gracefully', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      gauge.destroy();

      // Refresh should throw error after destruction
      assert.throws(() => {
        gauge.refresh(75);
      });

      // Second destroy should not throw
      assert.doesNotThrow(() => {
        gauge.destroy();
      });
    });

    test('should handle invalid refresh parameters', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
      });

      // Invalid value should throw
      assert.throws(() => {
        gauge.refresh('invalid');
      });

      // But gauge should still be functional
      assert.doesNotThrow(() => {
        gauge.refresh(75);
      });

      assert.equal(gauge.getValue(), 75);
    });
  });

  describe('Memory Management', () => {
    test('should clean up animation resources on destroy', () => {
      const gauge = new JustGage({
        parentNode: container,
        value: 50,
        startAnimationTime: 1000, // Long animation
      });

      assert.ok(gauge.animator);

      gauge.destroy();

      // Animation should be cancelled
      assert.equal(gauge.animator, null);
    });

    test('should handle rapid creation and destruction', () => {
      for (let i = 0; i < 10; i++) {
        const testContainer = document.createElement('div');
        document.body.appendChild(testContainer);

        const gauge = new JustGage({
          parentNode: testContainer,
          value: i * 10,
        });

        gauge.destroy();
        testContainer.remove();
      }

      // Should complete without memory leaks or errors
      assert.ok(true);
    });
  });
});
