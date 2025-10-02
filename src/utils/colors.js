/**
 * Color manipulation utilities
 */

/**
 * Remove # from hex color string
 * @param {string} str - Hex color string
 * @returns {string} Hex color without #
 */
export function cutHex(str) {
  return str.charAt(0) === '#' ? str.substring(1, 7) : str;
}

/**
 * Validate if string is a valid hex color
 * @param {string} val - String to validate
 * @returns {boolean} True if valid hex color
 */
export function isHexColor(val) {
  const regExp = /^#([0-9A-Fa-f]{3}){1,2}$/;
  return typeof val === 'string' && regExp.test(val);
}

/**
 * Get color for a value based on color scheme and custom sectors
 * @param {number} val - Current value
 * @param {number} pct - Percentage (0-1)
 * @param {string[]} col - Color array
 * @param {boolean} noGradient - Disable gradient
 * @param {import('../types/index.d.ts').CustomSectors} custSec - Custom sectors configuration
 * @returns {string} RGB color string
 */
export function getColor(val, pct, col, noGradient, custSec) {
  let percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
  const cust = custSec && custSec.ranges && custSec.ranges.length > 0;
  noGradient = noGradient || cust;

  if (cust) {
    if (custSec.percents === true) val = pct * 100;
    for (let i = 0; i < custSec.ranges.length; i++) {
      if (val >= custSec.ranges[i].lo && val <= custSec.ranges[i].hi) {
        return custSec.ranges[i].color;
      }
    }
  }

  const no = col.length;
  if (no === 1) return col[0];
  const inc = noGradient ? 1 / no : 1 / (no - 1);
  const colors = [];

  for (let i = 0; i < col.length; i++) {
    percentage = noGradient ? inc * (i + 1) : inc * i;
    rval = parseInt(cutHex(col[i]).substring(0, 2), 16);
    gval = parseInt(cutHex(col[i]).substring(2, 4), 16);
    bval = parseInt(cutHex(col[i]).substring(4, 6), 16);
    colors[i] = {
      pct: percentage,
      color: {
        r: rval,
        g: gval,
        b: bval,
      },
    };
  }

  if (pct === 0) {
    return `rgb(${[colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',')})`;
  }

  for (let j = 0; j < colors.length; j++) {
    if (pct <= colors[j].pct) {
      if (noGradient) {
        return `rgb(${[colors[j].color.r, colors[j].color.g, colors[j].color.b].join(',')})`;
      } else {
        lower = colors[j - 1] || colors[0];
        upper = colors[j];
        range = upper.pct - lower.pct;
        rangePct = (pct - lower.pct) / range;
        pctLower = 1 - rangePct;
        pctUpper = rangePct;
        color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
        };
        return `rgb(${[color.r, color.g, color.b].join(',')})`;
      }
    }
  }
}
