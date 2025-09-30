/**
 * General utility functions for JustGage
 */

/**
 * Check if a value is undefined or null
 * @param {any} v - Value to check
 * @returns {boolean} True if undefined or null
 */
export function isUndefined(v) {
  return v === null || v === undefined;
}

/**
 * Check if a value is a valid number
 * @param {any} n - Value to check
 * @returns {boolean} True if valid number
 */
export function isNumber(n) {
  return n !== null && n !== undefined && !isNaN(n);
}

/**
 * Extend target object with properties from source objects
 * @param {object} out - Target object
 * @param {...object} sources - Source objects
 * @returns {object} Extended object
 */
export function extend(out, ...sources) {
  out = out || {};

  for (const source of sources) {
    if (!source) {
      continue;
    }

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = source[key];
      }
    }
  }

  return out;
}

/**
 * Generate a UUID v4
 * @returns {string} UUID string
 */
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Lookup value from multiple hash tables with fallback
 * @param {string} key - Key to lookup
 * @param {object} tableA - First table
 * @param {object} tableB - Second table (e.g., dataset)
 * @param {any} defVal - Default value
 * @param {string} dataType - Data type conversion ('int', 'float')
 * @returns {any} Found value or default
 */
export function kvLookup(key, tableA, tableB, defVal, dataType) {
  let val = defVal;
  let canConvert = false;

  if (!isUndefined(key)) {
    if (!isUndefined(tableB) && typeof tableB === 'object' && key in tableB) {
      val = tableB[key];
      canConvert = true;
    } else if (!isUndefined(tableA) && typeof tableA === 'object' && key in tableA) {
      val = tableA[key];
      canConvert = true;
    } else {
      val = defVal;
    }

    if (canConvert && !isUndefined(dataType)) {
      switch (dataType) {
        case 'int':
          val = parseInt(val, 10);
          break;
        case 'float':
          val = parseFloat(val);
          break;
        default:
          break;
      }
    }
  }

  return val;
}

/**
 * Clamp a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Clamped value
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Create a simple event emitter
 * @returns {object} Event emitter with on, off, and emit methods
 */
export function createEventEmitter() {
  const events = {};

  return {
    on(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },

    off(event, callback) {
      if (!events[event]) return;

      if (callback) {
        const index = events[event].indexOf(callback);
        if (index > -1) {
          events[event].splice(index, 1);
        }
      } else {
        events[event] = [];
      }
    },

    emit(event, ...args) {
      if (!events[event]) return;
      events[event].forEach(callback => callback(...args));
    },
  };
}
