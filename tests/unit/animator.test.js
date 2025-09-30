/**
 * Unit tests for GaugeAnimator class
 */

import '../setup.js';
import { test, describe, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import { GaugeAnimator } from '../../src/core/GaugeAnimator.js';

describe('GaugeAnimator', () => {
  let animator;

  beforeEach(() => {
    animator = new GaugeAnimator();
  });

  describe('Construction', () => {
    test('should create animator instance', () => {
      assert.ok(animator instanceof GaugeAnimator);
      assert.equal(animator.currentAnimation, null);
    });
  });

  describe('Animation with Zero Duration', () => {
    test('should immediately call callbacks for zero duration', () => {
      let updateCalled = false;
      let completeCalled = false;
      let counterCalled = false;
      let finalValue = null;

      animator.animate({
        fromValue: 10,
        toValue: 90,
        duration: 0,
        onUpdate: value => {
          updateCalled = true;
          finalValue = value;
        },
        onComplete: () => {
          completeCalled = true;
        },
        onCounterUpdate: _value => {
          counterCalled = true;
        },
      });

      assert.equal(updateCalled, true);
      assert.equal(completeCalled, true);
      assert.equal(counterCalled, true);
      assert.equal(finalValue, 90);
    });

    test('should handle negative duration as zero', () => {
      let updateCalled = false;
      let finalValue = null;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: -100,
        onUpdate: value => {
          updateCalled = true;
          finalValue = value;
        },
      });

      assert.equal(updateCalled, true);
      assert.equal(finalValue, 100);
    });
  });

  describe('Animation Cancellation', () => {
    test('should cancel current animation when starting new one', () => {
      let firstCompleted = false;
      let secondStarted = false;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 1000,
        onUpdate: () => {},
        onComplete: () => {
          firstCompleted = true;
        },
      });

      // Start second animation immediately
      animator.animate({
        fromValue: 50,
        toValue: 75,
        duration: 0,
        onUpdate: () => {
          secondStarted = true;
        },
      });

      assert.equal(firstCompleted, false);
      assert.equal(secondStarted, true);
    });

    test('should allow manual cancellation', () => {
      let completed = false;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 1000,
        onUpdate: () => {},
        onComplete: () => {
          completed = true;
        },
      });

      animator.cancel();
      assert.equal(completed, false);
      assert.equal(animator.currentAnimation, null);
    });
  });

  describe('Easing Functions', () => {
    test('should handle linear easing', (t, done) => {
      let updateCount = 0;
      const values = [];

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: 'linear',
        onUpdate: value => {
          updateCount++;
          values.push(value);
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          assert.equal(values[values.length - 1], 100);
          done();
        },
      });
    });

    test('should handle ease-out easing', (t, done) => {
      let updateCount = 0;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: '>',
        onUpdate: () => {
          updateCount++;
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          done();
        },
      });
    });

    test('should handle ease-in easing', (t, done) => {
      let updateCount = 0;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: '<',
        onUpdate: () => {
          updateCount++;
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          done();
        },
      });
    });

    test('should handle ease-in-out easing', (t, done) => {
      let updateCount = 0;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: '<>',
        onUpdate: () => {
          updateCount++;
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          done();
        },
      });
    });

    test('should handle bounce easing', (t, done) => {
      let updateCount = 0;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: 'bounce',
        onUpdate: () => {
          updateCount++;
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          done();
        },
      });
    });

    test('should default to linear for unknown easing', (t, done) => {
      let updateCount = 0;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 100,
        easing: 'unknown',
        onUpdate: () => {
          updateCount++;
        },
        onComplete: () => {
          assert.ok(updateCount > 0);
          done();
        },
      });
    });
  });

  describe('Value Range Animation', () => {
    test('should animate from lower to higher value', (t, done) => {
      let firstValue = null;
      let lastValue = null;

      animator.animate({
        fromValue: 10,
        toValue: 90,
        duration: 50,
        onUpdate: value => {
          if (firstValue === null) firstValue = value;
          lastValue = value;
        },
        onComplete: () => {
          assert.ok(firstValue >= 10);
          assert.equal(lastValue, 90);
          done();
        },
      });
    });

    test('should animate from higher to lower value', (t, done) => {
      let firstValue = null;
      let lastValue = null;

      animator.animate({
        fromValue: 90,
        toValue: 10,
        duration: 50,
        onUpdate: value => {
          if (firstValue === null) firstValue = value;
          lastValue = value;
        },
        onComplete: () => {
          assert.ok(firstValue <= 90);
          assert.equal(lastValue, 10);
          done();
        },
      });
    });

    test('should handle negative values', (t, done) => {
      let lastValue = null;

      animator.animate({
        fromValue: -50,
        toValue: 50,
        duration: 50,
        onUpdate: value => {
          lastValue = value;
        },
        onComplete: () => {
          assert.equal(lastValue, 50);
          done();
        },
      });
    });

    test('should handle same from/to values', () => {
      let updateCalled = false;
      let finalValue = null;

      animator.animate({
        fromValue: 50,
        toValue: 50,
        duration: 0, // Zero duration for immediate execution
        onUpdate: value => {
          updateCalled = true;
          finalValue = value;
        },
      });

      assert.equal(updateCalled, true);
      assert.equal(finalValue, 50);
    });
  });

  describe('Callback Handling', () => {
    test('should handle missing callbacks gracefully', () => {
      assert.doesNotThrow(() => {
        animator.animate({
          fromValue: 0,
          toValue: 100,
          duration: 0,
          // No callbacks provided
        });
      });
    });

    test('should call counter update callback when provided', (t, done) => {
      let counterUpdated = false;
      let counterValue = null;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 50,
        onUpdate: () => {},
        onCounterUpdate: value => {
          counterUpdated = true;
          counterValue = value;
        },
        onComplete: () => {
          assert.equal(counterUpdated, true);
          assert.equal(counterValue, 100);
          done();
        },
      });
    });

    test('should not call counter callback when not provided', (t, done) => {
      let normalUpdateCalled = false;

      animator.animate({
        fromValue: 0,
        toValue: 100,
        duration: 50,
        onUpdate: () => {
          normalUpdateCalled = true;
        },
        onComplete: () => {
          assert.equal(normalUpdateCalled, true);
          done();
        },
      });
    });
  });
});
