/**
 * DOM manipulation utilities
 */

/**
 * Get computed style property value
 * @param {HTMLElement} oElm - Element
 * @param {string} strCssRule - CSS property name
 * @returns {string} Property value
 */
export function getStyle(oElm, strCssRule) {
  let strValue = '';
  if (document.defaultView?.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/-(\w)/g, (strMatch, p1) => p1.toUpperCase());
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

/**
 * Wait for createElementNS to be available
 * @param {Function} func - Function to execute when ready
 */
export function onCreateElementNsReady(func) {
  if (document.createElementNS !== undefined) {
    func();
  } else {
    setTimeout(() => {
      onCreateElementNsReady(func);
    }, 100);
  }
}

/**
 * Fix for Raphael display:none tspan dy attribute bug
 * @param {object} elem - Raphael element
 * @param {number} fontSize - Font size
 * @param {number} txtYpos - Y position
 */
export function setDy(elem, _fontSize, _txtYpos) {
  // Get IE version detection
  const ie = getIEVersion();

  if ((!ie || ie > 9) && elem.node.firstChild.attributes.dy) {
    elem.node.firstChild.attributes.dy.value = 0;
  }
}

/**
 * Detect Internet Explorer version
 * @returns {number|undefined} IE version or undefined if not IE
 */
export function getIEVersion() {
  let v = 3;
  const div = document.createElement('div');
  const all = div.getElementsByTagName('i');

  while (all[0]) {
    div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->';
  }
  return v > 4 ? v : undefined;
}
