/**
 * Native SVG rendering functions
 * Replaces RaphaelJS dependency with browser-native SVG APIs
 */

/**
 * SVGRenderer - Native SVG rendering class for creating gauge graphics
 *
 * @class SVGRenderer
 * @description Provides a RaphaelJS-compatible API using native browser SVG APIs.
 * Handles creation and manipulation of SVG elements for gauge rendering.
 */
export class SVGRenderer {
  /**
   * Create a new SVG renderer instance
   *
   * @param {HTMLElement} container - DOM element to render SVG into
   * @param {number} width - SVG canvas width in pixels
   * @param {number} height - SVG canvas height in pixels
   */
  constructor(container, width, height) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.svg = null;
    this.elements = new Map();
    this.init();
  }

  init() {
    // Create SVG element
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('width', this.width);
    this.svg.setAttribute('height', this.height);
    this.svg.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.style.overflow = 'hidden';

    // Clear container and add SVG
    this.container.innerHTML = '';
    this.container.appendChild(this.svg);
  }

  /**
   * Create a circle element
   */
  circle(cx, cy, radius) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', radius);
    this.svg.appendChild(circle);

    return new SVGElement(circle);
  }

  /**
   * Create a rectangle element
   */
  rect(x, y, width, height) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
    this.svg.appendChild(rect);

    return new SVGElement(rect);
  }

  /**
   * Create a path element
   */
  path(pathData) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    this.svg.appendChild(path);

    return new SVGElement(path);
  }

  /**
   * Create a line element
   */
  line(x1, y1, x2, y2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    this.svg.appendChild(line);

    return new SVGElement(line);
  }

  /**
   * Create a text element
   */
  text(x, y, content) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.textContent = content;
    this.svg.appendChild(text);

    return new SVGElement(text);
  }

  /**
   * Create an arc/sector path
   */
  sector(cx, cy, r1, r2, startAngle, endAngle) {
    const pathData = this.createSectorPath(cx, cy, r1, r2, startAngle, endAngle);
    return this.path(pathData);
  }

  /**
   * Generate SVG path data for an arc sector matching original JustGage
   */
  createSectorPath(cx, cy, r1, r2, startAngle, endAngle) {
    const rad1 = ((startAngle - 90) * Math.PI) / 180;
    const rad2 = ((endAngle - 90) * Math.PI) / 180;

    const x1 = cx + r1 * Math.cos(rad1);
    const y1 = cy + r1 * Math.sin(rad1);
    const x2 = cx + r2 * Math.cos(rad1);
    const y2 = cy + r2 * Math.sin(rad1);
    const x3 = cx + r2 * Math.cos(rad2);
    const y3 = cy + r2 * Math.sin(rad2);
    const x4 = cx + r1 * Math.cos(rad2);
    const y4 = cy + r1 * Math.sin(rad2);

    // Handle angle wrapping for large arc flag
    let angleSpan = endAngle - startAngle;
    if (angleSpan <= 0) {
      angleSpan += 360;
    }
    const largeArcFlag = angleSpan > 180 ? 1 : 0;

    return [
      `M ${x1} ${y1}`,
      `L ${x2} ${y2}`,
      `A ${r2} ${r2} 0 ${largeArcFlag} 1 ${x3} ${y3}`,
      `L ${x4} ${y4}`,
      `A ${r1} ${r1} 0 ${largeArcFlag} 0 ${x1} ${y1}`,
      'Z',
    ].join(' ');
  }

  /**
   * Create gauge path using original JustGage algorithm with exact widget parameters
   */
  createGaugePath(
    value,
    min,
    max,
    widgetW,
    widgetH,
    dx,
    dy,
    gaugeWidthScale,
    donut = false,
    isDiff = false
  ) {
    let alpha; // angle in radians
    let Ro; // outer radius, from center to outer edge of gauge
    let Ri; // inner radius, from center to inner edge of gauge
    let Cx; // center x
    let Cy; // center y
    let Xo, Yo, Xi, Yi; // outer and inner arc endpoints
    let path; // SVG path string

    if (min < 0 && !isDiff) {
      max -= min;
      value -= min;
      min = 0;
    }

    if (donut) {
      alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI;
      Ro = widgetW / 2 - widgetW / 30;
      Ri = Ro - (widgetW / 6.666666666666667) * gaugeWidthScale;

      Cx = widgetW / 2 + dx;
      Cy = widgetH / 2 + dy;

      Xo = Cx + Ro * Math.cos(alpha);
      Yo = Cy - Ro * Math.sin(alpha);
      Xi = Cx + Ri * Math.cos(alpha);
      Yi = Cy - Ri * Math.sin(alpha);

      path = 'M' + (Cx - Ri) + ',' + Cy + ' ';
      path += 'L' + (Cx - Ro) + ',' + Cy + ' ';
      if (value - min > (max - min) / 2) {
        path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + (Cx + Ro) + ',' + Cy + ' ';
      }
      path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + Xo + ',' + Yo + ' ';
      path += 'L' + Xi + ',' + Yi + ' ';
      if (value - min > (max - min) / 2) {
        path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx + Ri) + ',' + Cy + ' ';
      }
      path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx - Ri) + ',' + Cy + ' ';
      path += 'Z ';
    } else if (isDiff) {
      alpha = (1 - (value - min) / (max - min)) * Math.PI;
      Ro = widgetW / 2 - widgetW / 10;
      Ri = Ro - (widgetW / 6.666666666666667) * gaugeWidthScale;

      Cx = widgetW / 2 + dx;
      Cy = widgetH / 1.25 + dy;

      Xo = Cx + Ro * Math.cos(alpha);
      Yo = Cy - Ro * Math.sin(alpha);
      Xi = Cx + Ri * Math.cos(alpha);
      Yi = Cy - Ri * Math.sin(alpha);

      const middle = min + (max - min) / 2;
      const So = value < middle ? 1 : 0; // sweep flag for outer arc
      const Si = value < middle ? 0 : 1; // sweep flag for inner arc

      path = 'M' + Cx + ',' + (Cy - Ri) + ' '; // start at bottom center
      path += 'L' + Cx + ',' + (Cy - Ro) + ' '; // line to top center (Cx, Cy - Ro)
      path += 'A' + Ro + ',' + Ro + ' 0 0 ' + Si + ' ' + Xo + ',' + Yo + ' '; // arc to outer edge
      path += 'L' + Xi + ',' + Yi + ' '; // line to inner edge (Xi, Yi)
      path += 'A' + Ri + ',' + Ri + ' 0 0 ' + So + ' ' + Cx + ',' + (Cy - Ri) + ' '; // arc to bottom center
      path += 'Z '; // close path
    } else {
      // Standard gauge
      alpha = (1 - (value - min) / (max - min)) * Math.PI;
      Ro = widgetW / 2 - widgetW / 10;
      Ri = Ro - (widgetW / 6.666666666666667) * gaugeWidthScale;

      Cx = widgetW / 2 + dx;
      Cy = widgetH / 1.25 + dy;

      Xo = Cx + Ro * Math.cos(alpha);
      Yo = Cy - Ro * Math.sin(alpha);
      Xi = Cx + Ri * Math.cos(alpha);
      Yi = Cy - Ri * Math.sin(alpha);

      path = 'M' + (Cx - Ri) + ',' + Cy + ' ';
      path += 'L' + (Cx - Ro) + ',' + Cy + ' ';
      path += 'A' + Ro + ',' + Ro + ' 0 0 1 ' + Xo + ',' + Yo + ' ';
      path += 'L' + Xi + ',' + Yi + ' ';
      path += 'A' + Ri + ',' + Ri + ' 0 0 0 ' + (Cx - Ri) + ',' + Cy + ' ';
      path += 'Z ';
    }

    return path;
  }

  /**
   * Create gauge pointer (triangle path)
   */
  pointer(cx, cy, length, width, angle) {
    const rad = ((angle - 90) * Math.PI) / 180;
    const tipX = cx + length * Math.cos(rad);
    const tipY = cy + length * Math.sin(rad);

    const baseRad1 = rad + Math.PI / 2;
    const baseRad2 = rad - Math.PI / 2;
    const halfWidth = width / 2;

    const base1X = cx + halfWidth * Math.cos(baseRad1);
    const base1Y = cy + halfWidth * Math.sin(baseRad1);
    const base2X = cx + halfWidth * Math.cos(baseRad2);
    const base2Y = cy + halfWidth * Math.sin(baseRad2);

    const pathData = `M ${tipX} ${tipY} L ${base1X} ${base1Y} L ${base2X} ${base2Y} Z`;
    return this.path(pathData);
  }

  /**
   * Remove all elements from SVG
   */
  clear() {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }
    this.elements.clear();
  }

  /**
   * Remove the entire SVG from DOM
   */
  remove() {
    if (this.svg && this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
    this.elements.clear();
  }
}

/**
 * Wrapper class for SVG elements to provide Raphael-like API
 */
export class SVGElement {
  constructor(element) {
    this.element = element;
  }

  /**
   * Set element attributes
   */
  attr(attrs) {
    if (typeof attrs === 'string') {
      return this.element.getAttribute(attrs);
    }

    Object.keys(attrs).forEach(key => {
      const value = attrs[key];

      // Handle special attribute mappings
      switch (key) {
        case 'fill':
          this.element.setAttribute('fill', value);
          break;
        case 'stroke':
          this.element.setAttribute('stroke', value);
          break;
        case 'stroke-width':
        case 'strokeWidth':
          this.element.setAttribute('stroke-width', value);
          break;
        case 'opacity':
          this.element.setAttribute('opacity', value);
          break;
        case 'font-family':
        case 'fontFamily':
          this.element.setAttribute('font-family', value);
          break;
        case 'font-size':
        case 'fontSize':
          this.element.setAttribute('font-size', value);
          break;
        case 'font-weight':
        case 'fontWeight':
          this.element.setAttribute('font-weight', value);
          break;
        case 'text-anchor':
        case 'textAnchor':
          this.element.setAttribute('text-anchor', value);
          break;
        case 'dominant-baseline':
        case 'dominantBaseline':
          this.element.setAttribute('dominant-baseline', value);
          break;
        default:
          this.element.setAttribute(key, value);
      }
    });

    return this;
  }

  /**
   * Animate element (simplified version)
   */
  animate(attrs, duration = 500, easing = 'ease') {
    const element = this.element;

    // Create CSS transition
    const transitions = [];
    Object.keys(attrs).forEach(key => {
      let property = key;
      if (key === 'strokeWidth') property = 'stroke-width';
      if (key === 'fontSize') property = 'font-size';
      transitions.push(`${property} ${duration}ms ${easing}`);
    });

    element.style.transition = transitions.join(', ');

    // Apply new attributes after a brief delay
    setTimeout(() => {
      this.attr(attrs);
    }, 10);

    // Clean up transition after animation
    setTimeout(() => {
      element.style.transition = '';
    }, duration + 10);

    return this;
  }

  /**
   * Transform element
   */
  transform(transformString) {
    this.element.setAttribute('transform', transformString);
    return this;
  }

  /**
   * Remove element from DOM
   */
  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    return this;
  }

  /**
   * Hide element
   */
  hide() {
    this.element.style.display = 'none';
    return this;
  }

  /**
   * Show element
   */
  show() {
    this.element.style.display = '';
    return this;
  }

  /**
   * Set element text content
   */
  text(content) {
    if (content === undefined) {
      return this.element.textContent;
    }
    this.element.textContent = content;
    return this;
  }
}
