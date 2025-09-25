/**
 * Basic unit tests for JustGage core functionality
 */

import '../setup.js';
import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { JustGage } from '../../src/index.js';

describe('JustGage', () => {
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
    // Mock DOM element
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    const gauge = new JustGage({
      parentNode: mockElement,
      value: 50,
    });

    assert.equal(gauge.getValue(), 50);
    assert.equal(typeof gauge.getConfig(), 'object');
  });

  test('should update value with refresh', () => {
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    const gauge = new JustGage({
      parentNode: mockElement,
      value: 50,
    });

    gauge.refresh(75);
    assert.equal(gauge.getValue(), 75);
  });

  test('should handle min/max bounds', () => {
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    const gauge = new JustGage({
      parentNode: mockElement,
      value: 150,
      min: 0,
      max: 100,
    });

    // Value should be clamped to max
    assert.equal(gauge.getValue(), 100);
  });

  test('should clean up on destroy', () => {
    const mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    const gauge = new JustGage({
      parentNode: mockElement,
      value: 50,
    });

    gauge.destroy();
    assert.equal(gauge.node, null);
    assert.equal(gauge.config, null);
  });
});
