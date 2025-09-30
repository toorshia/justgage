/**
 * Unit tests for configuration and utility functions
 */

import '../setup.js';
import { test, describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { createConfig } from '../../src/core/config.js';
import { isNumber } from '../../src/utils/helpers.js';
import { isHexColor, getColor } from '../../src/utils/colors.js';
import { formatNumber, humanFriendlyNumber } from '../../src/utils/formatters.js';

describe('Configuration System', () => {
  describe('createConfig', () => {
    test('should create default configuration with valid container', () => {
      const config = createConfig({ parentNode: document.createElement('div') });

      assert.equal(config.min, 0);
      assert.equal(config.max, 100);
      assert.equal(config.value, 0);
      assert.equal(config.width, 400);
      assert.equal(config.height, 320);
      assert.equal(config.decimals, 0);
      assert.equal(config.symbol, '');
    });
    test('should merge custom values with defaults', () => {
      const config = createConfig({
        parentNode: document.createElement('div'),
        value: 75,
        min: -50,
        max: 150,
        title: 'Custom Gauge',
        decimals: 2,
      });

      assert.equal(config.value, 75);
      assert.equal(config.min, -50);
      assert.equal(config.max, 150);
      assert.equal(config.title, 'Custom Gauge');
      assert.equal(config.decimals, 2);
      // Should still have defaults for non-specified values
      assert.equal(config.width, 400);
      assert.equal(config.height, 320);
    });

    test('should handle nested object configuration', () => {
      const config = createConfig({
        parentNode: document.createElement('div'),
        pointerOptions: {
          color: '#ff0000',
          toplength: 20,
          bottomlength: 30,
        },
      });

      assert.equal(config.pointerOptions.color, '#ff0000');
      assert.equal(config.pointerOptions.toplength, 20);
      assert.equal(config.pointerOptions.bottomlength, 30);
    });

    test('should handle levelColors array', () => {
      const colors = ['#green', '#yellow', '#red'];
      const config = createConfig({
        parentNode: document.createElement('div'),
        levelColors: colors,
      });

      assert.deepEqual(config.levelColors, colors);
    });

    test('should handle customSectors configuration', () => {
      const sectors = [
        { lo: 0, hi: 50, color: '#green' },
        { lo: 50, hi: 100, color: '#red' },
      ];
      const config = createConfig({
        parentNode: document.createElement('div'),
        customSectors: sectors,
      });

      assert.deepEqual(config.customSectors, sectors);
    });
  });
});

describe('Helper Functions', () => {
  describe('isNumber', () => {
    test('should identify valid numbers', () => {
      assert.equal(isNumber(42), true);
      assert.equal(isNumber(0), true);
      assert.equal(isNumber(-15), true);
      assert.equal(isNumber(3.14), true);
      assert.equal(isNumber('42'), true);
      assert.equal(isNumber('3.14'), true);
    });

    test('should reject invalid numbers', () => {
      assert.equal(isNumber(null), false);
      assert.equal(isNumber(undefined), false);
      assert.equal(isNumber('abc'), false);
      assert.equal(isNumber(''), true); // Empty string converts to 0, so !isNaN('') is true
      assert.equal(isNumber({}), false);
      assert.equal(isNumber([]), true); // Empty array converts to 0, so !isNaN([]) is true
      assert.equal(isNumber(NaN), false); // NaN is type number, but !isNaN(NaN) is false, so function returns false
      assert.equal(isNumber(Infinity), true);
    });
  });
});

describe('Color Functions', () => {
  describe('isHexColor', () => {
    test('should identify valid hex colors', () => {
      assert.equal(isHexColor('#ff0000'), true);
      assert.equal(isHexColor('#FF0000'), true);
      assert.equal(isHexColor('#f00'), true);
      assert.equal(isHexColor('#F00'), true);
      assert.equal(isHexColor('#123456'), true);
      assert.equal(isHexColor('#abc'), true);
    });

    test('should reject invalid hex colors', () => {
      assert.equal(isHexColor('ff0000'), false); // Missing #
      assert.equal(isHexColor('#gg0000'), false); // Invalid character
      assert.equal(isHexColor('#ff'), false); // Too short
      assert.equal(isHexColor('#ff00000'), false); // Too long
      assert.equal(isHexColor('red'), false); // Named color
      assert.equal(isHexColor(''), false); // Empty string
      assert.equal(isHexColor(null), false); // Null
    });
  });

  describe('getColor', () => {
    test('should return colors from levelColors array', () => {
      const levelColors = ['#00ff00', '#ffff00', '#ff0000'];

      // Test getting colors based on percentage
      assert.equal(getColor(0, 0, levelColors), 'rgb(0,255,0)');
      assert.equal(getColor(100, 1, levelColors), 'rgb(255,0,0)');
    });

    test('should handle custom sectors', () => {
      const customSectors = {
        ranges: [
          { lo: 0, hi: 50, color: '#00ff00' },
          { lo: 50, hi: 100, color: '#ff0000' },
        ],
      };

      const color1 = getColor(25, 25, [], false, customSectors);
      const color2 = getColor(75, 75, [], false, customSectors);

      assert.equal(color1, '#00ff00');
      assert.equal(color2, '#ff0000');
    });

    test('should handle edge cases', () => {
      const levelColors = ['#00ff00', '#ffff00', '#ff0000'];

      // Value at exact boundaries
      const colorAtMin = getColor(0, 0, levelColors);
      const colorAtMax = getColor(100, 1, levelColors);

      assert.ok(colorAtMin);
      assert.ok(colorAtMax);
    });
  });
});

describe('Formatter Functions', () => {
  describe('formatNumber', () => {
    test('should format numbers with commas', () => {
      assert.equal(formatNumber(1000), '1,000');
      assert.equal(formatNumber(1234567), '1,234,567');
      assert.equal(formatNumber(123), '123');
    });

    test('should handle decimal numbers', () => {
      assert.equal(formatNumber(1234.56), '1,234.56');
      assert.equal(formatNumber(1000.0), '1,000');
    });

    test('should handle negative numbers', () => {
      assert.equal(formatNumber(-1000), '-1,000');
      assert.equal(formatNumber(-1234.56), '-1,234.56');
    });

    test('should handle zero and small numbers', () => {
      assert.equal(formatNumber(0), '0');
      assert.equal(formatNumber(12), '12');
      assert.equal(formatNumber(123), '123');
    });
  });

  describe('humanFriendlyNumber', () => {
    test('should format large numbers with suffixes', () => {
      assert.equal(humanFriendlyNumber(1000, 0), '1K');
      assert.equal(humanFriendlyNumber(1500, 0), '2K');
      assert.equal(humanFriendlyNumber(1000000, 0), '1M');
      assert.equal(humanFriendlyNumber(1500000, 0), '2M');
      assert.equal(humanFriendlyNumber(1000000000, 0), '1G');
    });

    test('should handle small numbers without modification', () => {
      assert.equal(humanFriendlyNumber(999, 0), '999 ');
      assert.equal(humanFriendlyNumber(500, 0), '500 ');
      assert.equal(humanFriendlyNumber(0, 0), '0 ');
    });

    test('should respect decimal places parameter', () => {
      assert.equal(humanFriendlyNumber(1500, 0), '2K');
      assert.equal(humanFriendlyNumber(1500, 1), '1.5K');
      assert.equal(humanFriendlyNumber(1500, 2), '1.5K'); // Function doesn't add trailing zeros
    });

    test('should handle negative numbers', () => {
      assert.equal(humanFriendlyNumber(-1000, 0), '-1K');
      assert.equal(humanFriendlyNumber(-1500000, 0), '-1M');
    });

    test('should handle very large numbers', () => {
      assert.equal(humanFriendlyNumber(1000000000000, 0), '1T');
      assert.equal(humanFriendlyNumber(1500000000000, 0), '2T');
    });
  });
});

describe('Edge Cases and Error Handling', () => {
  test('should handle undefined/null inputs gracefully', () => {
    assert.throws(() => {
      createConfig(null);
    }, /Configuration object is required/);

    assert.throws(() => {
      createConfig(undefined);
    }, /Configuration object is required/);
  });

  test('should handle invalid color inputs', () => {
    const levelColors = ['#green']; // Invalid hex color

    const result = getColor(50, 0.5, levelColors);
    // When only one color, function returns that color directly
    assert.equal(result, '#green');
  });

  test('should handle invalid number formatting inputs', () => {
    assert.throws(() => {
      formatNumber(null);
    });

    assert.doesNotThrow(() => {
      humanFriendlyNumber(undefined);
    });
  });

  test('should handle extreme number ranges', () => {
    assert.doesNotThrow(() => {
      const container = document.createElement('div');
      const config = createConfig({
        parentNode: container,
        min: -999999999,
        max: 999999999,
        value: 0,
      });
      assert.ok(config);
    });
  });
});
