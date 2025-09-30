import { createConfig, GAUGE_WIDTH_DIVISOR } from './config.js';
import { SVGRenderer } from '../rendering/svg.js';
import { isNumber } from '../utils/helpers.js';
import { isHexColor, getColor } from '../utils/colors.js';
import { formatNumber, humanFriendlyNumber } from '../utils/formatters.js';
import { GaugeAnimator } from './GaugeAnimator.js';

/**
 * JustGage - Modern ES6+ implementation for creating animated SVG dashboard gauges.
 *
 * Features:
 * - Zero dependencies (native SVG APIs)
 * - ES6+ class-based architecture
 * - Full backward compatibility with v1.x
 * - Custom sectors and pointer support
 * - Responsive design
 *
 * @class JustGage
 * @example
 * // Basic usage
 * const gauge = new JustGage({
 *   id: 'my-gauge',
 *   value: 75,
 *   min: 0,
 *   max: 100,
 *   title: 'Performance'
 * });
 *
 * // With custom colors
 * const colorGauge = new JustGage({
 *   id: 'color-gauge',
 *   value: 60,
 *   levelColors: ['#green', '#yellow', '#red'],
 *   customSectors: [
 *     { lo: 0, hi: 50, color: '#green' },
 *     { lo: 50, hi: 100, color: '#red' }
 *   ]
 * });
 */
export class JustGage {
  /**
   * Create a new gauge instance
   *
   * @param {import('../types/index.d.ts').JustGageConfig} config - Configuration options for the gauge
   * @throws {Error} When no configuration object is provided
   * @throws {Error} When neither id nor parentNode is provided
   * @throws {Error} When specified DOM element is not found
   * @throws {Error} When min >= max
   */
  constructor(config) {
    // Validate required container
    if (!config) {
      throw new Error('JustGage: Configuration object is required');
    }

    // Get container element
    if (config.id) {
      this.node = document.getElementById(config.id);
      if (!this.node) {
        throw new Error(`JustGage: No element with id '${config.id}' found`);
      }
    } else if (config.parentNode) {
      this.node = config.parentNode;
    } else {
      throw new Error('JustGage: Either id or parentNode must be provided');
    }

    // Get dataset attributes
    const dataset = this.node.dataset || {};

    // Create and validate configuration
    this.config = createConfig(config, dataset);
    this.originalValue = config.value ?? -1;

    // Cache for geometry calculations
    this._geometryCache = null;

    // Initialize gauge
    this._initializeGauge();
  }

  /**
   * Initialize the gauge rendering
   * @private
   */
  _initializeGauge() {
    // Determine dimensions like original JustGage
    let width = this.config.width;
    let height = this.config.height;

    // If no dimensions specified, try to get from container
    if (!width || !height) {
      const rect = this.node.getBoundingClientRect();
      if (!width) width = rect.width || 400;
      if (!height) height = rect.height || 320;

      // Update config with calculated dimensions
      this.config.width = width;
      this.config.height = height;
    }

    // Initialize SVG renderer
    this.renderer = new SVGRenderer(this.node, width, height);

    // Store references to drawn elements
    this.canvas = {
      gauge: null,
      level: null,
      title: null,
      value: null,
      min: null,
      max: null,
      pointer: null,
    };

    // Initialize animator
    this.animator = new GaugeAnimator();

    // Draw the gauge
    this._drawGauge();

    // Apply shadows after gauge elements are created
    if (this.config.showInnerShadow) {
      this._initializeShadow();
    }

    // Start initial animation
    this._startInitialAnimation();
  }

  /**
   * Draw the complete gauge
   * @private
   */
  _drawGauge() {
    const config = this.config;

    // Calculate widget dimensions using original algorithm
    const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();

    // Draw gauge background using original path generation
    const gaugePath = this.renderer.createGaugePath(
      config.max,
      config.min,
      config.max,
      widgetW,
      widgetH,
      dx,
      dy,
      config.gaugeWidthScale || 1.0,
      config.donut,
      config.differential
    );

    this.canvas.gauge = this.renderer.path(gaugePath).attr({
      fill: config.gaugeColor,
      stroke: 'none',
    });

    // Apply donut rotation to background gauge (like original)
    this._applyDonutRotation(this.canvas.gauge, config, widgetW, widgetH, dx, dy);

    // Draw value level (start from minimum for animation)
    this._drawLevel(config.min);

    // Draw labels
    this._drawLabels();

    // Draw pointer if enabled
    if (config.pointer) {
      this._drawPointer();
    }

    // Draw target line if specified (after gauge elements for proper Z-order)
    if (config.targetLine !== null && config.targetLine !== undefined) {
      this._drawTargetLine();
    }
  }

  /**
   * Draw gauge level (filled arc)
   * @private
   * @param {number} [animateValue] - If provided, draws level at this value instead of config.value
   */
  _drawLevel(animateValue) {
    const config = this.config;

    // Use provided animate value or config value
    const targetValue = animateValue !== undefined ? animateValue : config.value;

    // Use consistent geometry calculations
    const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();

    // Calculate reversed value if needed (same as original implementation)
    let displayValue = targetValue;
    if (config.reverse) {
      displayValue = config.max + config.min - targetValue;
    }

    // Get level color using original value (not reversed)
    const color = this._getLevelColor(targetValue);

    // Draw level arc using original path generation with potentially reversed value
    const levelPath = this.renderer.createGaugePath(
      displayValue,
      config.min,
      config.max,
      widgetW,
      widgetH,
      dx,
      dy,
      config.gaugeWidthScale || 1.0,
      config.donut,
      config.differential
    );

    if (this.canvas.level) {
      // Update existing level
      this.canvas.level.attr({
        d: levelPath,
        fill: color,
      });
    } else {
      // Create new level
      this.canvas.level = this.renderer.path(levelPath).attr({
        fill: color,
        stroke: 'none',
      });

      // Apply donut rotation to start from top (like original)
      this._applyDonutRotation(this.canvas.level, config, widgetW, widgetH, dx, dy);
    }
  }

  /**
   * Invalidate the geometry cache when config changes
   * @private
   */
  _invalidateGeometryCache() {
    this._geometryCache = null;
  }

  /**
   * Calculate consistent gauge geometry for both arc and text positioning
   * Uses caching to avoid redundant calculations
   * @private
   */
  _calculateGaugeGeometry() {
    // Return cached result if available
    if (this._geometryCache) {
      return this._geometryCache;
    }
    const config = this.config;
    const w = config.width;
    const h = config.height;

    // Calculate widget dimensions and offsets like in _drawLabels
    let widgetW, widgetH, dx, dy;
    if (config.donut) {
      if (w > h) {
        widgetH = h;
        widgetW = widgetH;
      } else if (w < h) {
        widgetW = w;
        widgetH = widgetW;
      } else {
        widgetW = w;
        widgetH = widgetW;
      }
      dx = (w - widgetW) / 2;
      dy = (h - widgetH) / 2;
    } else {
      // For regular gauges, use original formula
      if (w > h) {
        widgetH = h;
        widgetW = widgetH * 2;
        if (widgetW > w) {
          const aspect = widgetW / w;
          widgetW = widgetW / aspect;
          widgetH = widgetH / aspect;
        }
      } else if (w < h) {
        widgetW = w;
        widgetH = widgetW / 2;
      } else {
        widgetW = w;
        widgetH = widgetW / 2;
      }
      dx = (w - widgetW) / 2;
      dy = (h - widgetH) / 2;
    }

    // Calculate center point using widget positioning
    const cx = dx + widgetW / 2;
    const cy = config.donut ? dy + widgetH / 2 : dy + widgetH / 1.25;

    // Calculate radii using widget width (not canvas width)
    const outerRadius = config.donut ? widgetW / 2 - widgetW / 30 : widgetW / 2 - widgetW / 10;
    const gaugeWidthScale = config.gaugeWidthScale || 1.0;
    const innerRadius = outerRadius - (widgetW / GAUGE_WIDTH_DIVISOR) * gaugeWidthScale;

    // Cache the result
    this._geometryCache = { cx, cy, outerRadius, innerRadius, widgetW, widgetH, dx, dy };
    return this._geometryCache;
  }

  /**
   * Calculate font sizes for different text elements
   * @param {number} widgetH - Widget height
   * @param {object} config - Configuration object
   * @returns {object} Object containing all calculated font sizes
   * @private
   */
  _calculateFontSizes(widgetH, config) {
    const titleFontSize = Math.max(widgetH / 16, 10);

    const valueFontSize = config.donut
      ? widgetH / 6.4 > 16
        ? widgetH / 5.4
        : 18
      : widgetH / 6.5 > config.valueMinFontSize
        ? widgetH / 6.5
        : config.valueMinFontSize;

    const labelFontSize = config.donut
      ? widgetH / 16 > 10
        ? widgetH / 16
        : 10
      : widgetH / 16 > config.labelMinFontSize
        ? widgetH / 16
        : config.labelMinFontSize;

    const minMaxLabelFontSize = config.donut
      ? widgetH / 16 > 10
        ? widgetH / 16
        : 10
      : widgetH / 16 > config.minLabelMinFontSize
        ? widgetH / 16
        : config.minLabelMinFontSize;

    return {
      title: titleFontSize,
      value: valueFontSize,
      label: labelFontSize,
      minMax: minMaxLabelFontSize,
    };
  }

  /**
   * Apply donut rotation to an element if donut mode is enabled
   * @param {object} element - SVG element to rotate
   * @param {object} config - Configuration object
   * @param {number} widgetW - Widget width
   * @param {number} widgetH - Widget height
   * @param {number} dx - X offset
   * @param {number} dy - Y offset
   * @private
   */
  _applyDonutRotation(element, config, widgetW, widgetH, dx, dy, rotationOverride = null) {
    if (config.donut) {
      const centerX = widgetW / 2 + dx;
      const centerY = widgetH / 2 + dy;
      const rotation = rotationOverride || config.donutStartAngle || 90;
      element.transform(`rotate(${rotation} ${centerX} ${centerY})`);
    }
  }

  /**
   * Draw text labels
   * @private
   */
  _drawLabels() {
    const config = this.config;

    // Use consistent geometry calculations
    const { cx, cy, widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();

    // Calculate all font sizes
    const fontSizes = this._calculateFontSizes(widgetH, config);

    // Title
    if (config.title) {
      this.canvas.title = this.renderer.text(cx, cy - widgetH / 16, config.title).attr({
        'font-family': config.titleFontFamily,
        'font-size': fontSizes.title,
        'font-weight': config.titleFontWeight,
        'text-anchor': 'middle',
        fill: config.titleFontColor,
      });
    }

    // Calculate value position (needed for label positioning even if value is hidden)
    const valueX = dx + widgetW / 2;
    const valueY = config.donut
      ? config.label
        ? dy + widgetH / 1.85
        : dy + widgetH / 1.7
      : dy + widgetH / 1.275;

    // Value - only draw if not hidden
    if (!config.hideValue) {
      const displayValue = this._formatValue(config.value);

      this.canvas.value = this.renderer.text(valueX, valueY, displayValue).attr({
        'font-family': config.valueFontFamily,
        'font-size': fontSizes.value,
        'font-weight': 'bold',
        'text-anchor': 'middle',
        fill: config.valueFontColor,
      });
    }

    // Main label (units like %, km/h, etc.)
    if (config.label) {
      const labelY = config.donut ? valueY + fontSizes.label : valueY + fontSizes.value / 2 + 5;

      this.canvas.label = this.renderer.text(valueX, labelY, config.label).attr({
        'font-family': config.labelFontFamily,
        'font-size': fontSizes.label,
        'text-anchor': 'middle',
        fill: config.labelFontColor,
      });
    }

    // Min/Max labels (hidden in donut mode like original)
    if (config.showMinMax && !config.hideMinMax && !config.donut) {
      // Use original positioning formula with proper offsets
      const gaugeWidthScale = config.gaugeWidthScale || 1.0;

      // Use exact original positioning formula
      // For donut: labelY = valueY + labelFontSize
      // For regular: labelY = valueY + valueFontSize / 2 + 5
      let minMaxLabelY;
      if (config.donut) {
        minMaxLabelY = valueY + fontSizes.label;
      } else {
        // Use original formula exactly as in original JustGage
        minMaxLabelY = valueY + fontSizes.value / 2 + 5;
      }

      // Original positioning: based on widget width and scale with offsets
      const minX = dx + widgetW / 10 + ((widgetW / GAUGE_WIDTH_DIVISOR) * gaugeWidthScale) / 2;
      const maxX =
        dx + widgetW - widgetW / 10 - ((widgetW / GAUGE_WIDTH_DIVISOR) * gaugeWidthScale) / 2;
      const minY = minMaxLabelY;
      const maxY = minMaxLabelY;
      // Determine min and max text using utility function
      const minText = this._formatDisplayText(config.min, config, 'min');
      const maxText = this._formatDisplayText(config.max, config, 'max');

      if (!config.reverse) {
        this.canvas.min = this.renderer.text(minX, minY, minText).attr({
          'font-family': config.labelFontFamily,
          'font-size': fontSizes.minMax,
          'text-anchor': 'middle',
          fill: config.labelFontColor,
        });

        this.canvas.max = this.renderer.text(maxX, maxY, maxText).attr({
          'font-family': config.labelFontFamily,
          'font-size': fontSizes.minMax,
          'text-anchor': 'middle',
          fill: config.labelFontColor,
        });
      } else {
        // Reverse positions for reversed gauge
        this.canvas.min = this.renderer.text(maxX, maxY, minText).attr({
          'font-family': config.labelFontFamily,
          'font-size': fontSizes.minMax,
          'text-anchor': 'middle',
          fill: config.labelFontColor,
        });

        this.canvas.max = this.renderer.text(minX, minY, maxText).attr({
          'font-family': config.labelFontFamily,
          'font-size': fontSizes.minMax,
          'text-anchor': 'middle',
          fill: config.labelFontColor,
        });
      }
    }
  }

  /**
   * Draw gauge pointer using original JustGage needle algorithm
   * @private
   */
  _drawPointer() {
    const config = this.config;
    const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();

    // Calculate reversed value if needed (same as original implementation)
    let value = config.value;
    if (config.reverse) {
      value = config.max + config.min - config.value;
    }

    const min = config.min;
    const max = config.max;
    const gws = config.gaugeWidthScale;
    const donut = config.donut;

    // Use original pointer dimension calculations
    let dlt = (widgetW * 3.5) / 100; // top length
    let dlb = widgetW / 15; // bottom length
    let dw = widgetW / 100; // width

    if (config.pointerOptions.toplength != null && config.pointerOptions.toplength !== undefined) {
      dlt = config.pointerOptions.toplength;
    }
    if (
      config.pointerOptions.bottomlength != null &&
      config.pointerOptions.bottomlength !== undefined
    ) {
      dlb = config.pointerOptions.bottomlength;
    }
    if (
      config.pointerOptions.bottomwidth != null &&
      config.pointerOptions.bottomwidth !== undefined
    ) {
      dw = config.pointerOptions.bottomwidth;
    }

    let alpha, Ro, Ri, Cy, Xo, Yo, Xi, Yi, Xc, Yc, Xz, Yz, Xa, Ya, Xb, Yb, path;

    if (donut) {
      alpha = (1 - (2 * (value - min)) / (max - min)) * Math.PI;
      Ro = widgetW / 2 - widgetW / 30;
      Ri = Ro - (widgetW / GAUGE_WIDTH_DIVISOR) * gws;

      Cy = widgetH / 2 + dy;

      Xo = widgetW / 2 + dx + Ro * Math.cos(alpha);
      Yo = widgetH - (widgetH - Cy) - Ro * Math.sin(alpha);
      Xi = widgetW / 2 + dx + Ri * Math.cos(alpha);
      Yi = widgetH - (widgetH - Cy) - Ri * Math.sin(alpha);

      Xc = Xo + dlt * Math.cos(alpha);
      Yc = Yo - dlt * Math.sin(alpha);
      Xz = Xi - dlb * Math.cos(alpha);
      Yz = Yi + dlb * Math.sin(alpha);

      Xa = Xz + dw * Math.sin(alpha);
      Ya = Yz + dw * Math.cos(alpha);
      Xb = Xz - dw * Math.sin(alpha);
      Yb = Yz - dw * Math.cos(alpha);

      path = `M${Xa},${Ya} L${Xb},${Yb} L${Xc},${Yc} Z`;
    } else {
      alpha = (1 - (value - min) / (max - min)) * Math.PI;
      Ro = widgetW / 2 - widgetW / 10;
      Ri = Ro - (widgetW / GAUGE_WIDTH_DIVISOR) * gws;

      Cy = widgetH / 1.25 + dy;

      Xo = widgetW / 2 + dx + Ro * Math.cos(alpha);
      Yo = widgetH - (widgetH - Cy) - Ro * Math.sin(alpha);
      Xi = widgetW / 2 + dx + Ri * Math.cos(alpha);
      Yi = widgetH - (widgetH - Cy) - Ri * Math.sin(alpha);

      Xc = Xo + dlt * Math.cos(alpha);
      Yc = Yo - dlt * Math.sin(alpha);
      Xz = Xi - dlb * Math.cos(alpha);
      Yz = Yi + dlb * Math.sin(alpha);

      Xa = Xz + dw * Math.sin(alpha);
      Ya = Yz + dw * Math.cos(alpha);
      Xb = Xz - dw * Math.sin(alpha);
      Yb = Yz - dw * Math.cos(alpha);

      path = `M${Xa},${Ya} L${Xb},${Yb} L${Xc},${Yc} Z`;
    }

    // Draw pointer using the generated path
    this.canvas.pointer = this.renderer.path(path).attr({
      fill: config.pointerOptions.color || '#000000',
      stroke: config.pointerOptions.stroke || 'none',
      'stroke-width': config.pointerOptions.stroke_width || 0,
      'stroke-linecap': config.pointerOptions.stroke_linecap || 'square',
    });

    // Apply donut rotation if needed
    this._applyDonutRotation(
      this.canvas.pointer,
      config,
      widgetW,
      widgetH,
      dx,
      dy,
      config.donutStartAngle || 90
    );
  }

  /**
   * Draw target line at specified value
   * @private
   */
  _drawTargetLine() {
    const config = this.config;

    if (config.targetLine === null) {
      return;
    }

    const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();

    // Calculate reversed target value if needed (same as original implementation)
    let targetValue = config.targetLine;
    if (config.reverse) {
      targetValue = config.max + config.min - config.targetLine;
    }

    // Calculate angle based on gauge type (matching SVG renderer logic)
    let alpha;
    if (config.donut) {
      // Donut gauges use different angle calculation with 2x factor
      alpha = (1 - (2 * (targetValue - config.min)) / (config.max - config.min)) * Math.PI;
    } else {
      // Standard gauge angle calculation
      alpha = (1 - (targetValue - config.min) / (config.max - config.min)) * Math.PI;
    }

    let Ro = widgetW / 2 - widgetW / 10;
    let Ri = Ro - (widgetW / GAUGE_WIDTH_DIVISOR) * config.gaugeWidthScale;
    let Cx, Cy, Xo, Yo, Xi, Yi;

    if (config.donut) {
      Ro = widgetW / 2 - widgetW / 30;
      Ri = Ro - (widgetW / GAUGE_WIDTH_DIVISOR) * config.gaugeWidthScale;

      Cx = widgetW / 2 + dx;
      Cy = widgetH / 2 + dy;

      Xo = Cx + Ro * Math.cos(alpha);
      Yo = Cy - Ro * Math.sin(alpha);
      Xi = Cx + Ri * Math.cos(alpha);
      Yi = Cy - Ri * Math.sin(alpha);
    } else {
      Cx = widgetW / 2 + dx;
      Cy = widgetH / 1.25 + dy;

      Xo = Cx + Ro * Math.cos(alpha);
      Yo = Cy - Ro * Math.sin(alpha);
      Xi = Cx + Ri * Math.cos(alpha);
      Yi = Cy - Ri * Math.sin(alpha);
    }

    // Create path from inner to outer radius (like original)
    const pathData = `M ${Xi} ${Yi} L ${Xo} ${Yo}`;

    this.canvas.targetLine = this.renderer.path(pathData).attr({
      stroke: config.targetLineColor,
      'stroke-width': config.targetLineWidth,
    });

    // Apply donut rotation if needed (same as gauge elements)
    this._applyDonutRotation(this.canvas.targetLine, config, widgetW, widgetH, dx, dy);
  }

  /**
   * Get level color based on value
   * @private
   */
  _getLevelColor(value) {
    const config = this.config;
    const range = config.max - config.min;
    const ratio = (value - config.min) / range;

    // Use the same getColor function as the original JustGage
    return getColor(value, ratio, config.levelColors, config.noGradient, config.customSectors);
  }

  /**
   * Format text for display based on configuration
   * @param {number} value - The numeric value to format
   * @param {object} config - Configuration object
   * @param {string} textType - Type of text ('min', 'max', 'value')
   * @returns {string} Formatted text
   * @private
   */
  _formatDisplayText(value, config, textType = 'value') {
    // Handle custom text overrides first
    if (textType === 'min' && config.minTxt) {
      return config.minTxt;
    }
    if (textType === 'max' && config.maxTxt) {
      return config.maxTxt;
    }

    // Apply formatting based on configuration
    if (config.humanFriendly) {
      return (
        humanFriendlyNumber(value, config.humanFriendlyDecimal) +
        (textType === 'value' ? config.symbol : '')
      );
    } else if (config.formatNumber) {
      const formatted = formatNumber(
        textType === 'value' ? (value * 1).toFixed(config.decimals) : value
      );
      return formatted + (textType === 'value' ? config.symbol : '');
    } else if (textType === 'value' && config.displayRemaining) {
      return ((config.max - value) * 1).toFixed(config.decimals) + config.symbol;
    } else {
      const formatted = textType === 'value' ? (value * 1).toFixed(config.decimals) : value;
      return formatted + (textType === 'value' ? config.symbol : '');
    }
  }

  /**
   * Format value for display
   * @private
   */
  _formatValue(value) {
    const config = this.config;

    if (config.textRenderer && typeof config.textRenderer === 'function') {
      const renderedValue = config.textRenderer(value);
      if (renderedValue !== false) {
        return renderedValue;
      }
    }

    return this._formatDisplayText(value, config, 'value');
  }

  /**
   * Refresh gauge with new values
   * @param {number} val - New value
   * @param {number} [max] - New maximum value
   * @param {number} [min] - New minimum value
   * @param {string} [label] - New label
   */
  refresh(val, max, min, label) {
    if (!isNumber(val)) {
      throw new Error('JustGage: refresh() requires a numeric value');
    }

    // Store original value for display formatting (before clamping)
    const originalVal = val;

    // Update label if provided
    if (label !== null && label !== undefined) {
      this.config.label = label;
      if (this.canvas.label) {
        this.canvas.label.attr({ text: this.config.label });
      }
    }

    // Update minimum value if provided
    if (isNumber(min)) {
      this.config.min = min;

      // Update min text display
      if (this.canvas.min) {
        const minText = this._formatDisplayText(this.config.min, this.config, 'min');
        this.canvas.min.attr({ text: minText });
      }
    }

    // Update maximum value if provided
    if (isNumber(max)) {
      this.config.max = max;

      // Update max text display
      if (this.canvas.max) {
        const maxText = this._formatDisplayText(this.config.max, this.config, 'max');
        this.canvas.max.attr({ text: maxText });
      }
    }

    // Validate and clamp value bounds
    if (val * 1 > this.config.max * 1) {
      val = this.config.max * 1;
    }
    if (val * 1 < this.config.min * 1) {
      val = this.config.min * 1;
    }

    // Format display value using original logic
    let displayVal = originalVal; // Use original input value before clamping for display

    if (this.config.textRenderer && this.config.textRenderer(displayVal) !== false) {
      displayVal = this.config.textRenderer(displayVal);
    } else if (this.config.humanFriendly) {
      displayVal =
        humanFriendlyNumber(displayVal, this.config.humanFriendlyDecimal) + this.config.symbol;
    } else if (this.config.formatNumber) {
      displayVal =
        formatNumber((displayVal * 1).toFixed(this.config.decimals)) + this.config.symbol;
    } else if (this.config.displayRemaining) {
      displayVal =
        ((this.config.max - displayVal) * 1).toFixed(this.config.decimals) + this.config.symbol;
    } else {
      displayVal = (displayVal * 1).toFixed(this.config.decimals) + this.config.symbol;
    }

    this.config.value = val * 1;

    // Invalidate geometry cache if min/max changed
    if (isNumber(min) || isNumber(max)) {
      this._invalidateGeometryCache();
    }

    // Update value display
    if (!this.config.counter && !this.config.hideValue && this.canvas.value) {
      this.canvas.value.attr({ text: displayVal });
    }

    // Animation values will be calculated during redraw

    // Remove target line before redrawing level to maintain Z-order
    let hadTargetLine = false;
    if (
      this.config.targetLine !== null &&
      this.config.targetLine !== undefined &&
      this.canvas.targetLine
    ) {
      this.canvas.targetLine.remove();
      this.canvas.targetLine = null;
      hadTargetLine = true;
    }

    // Store current value to animate from
    const currentValue = this._getCurrentDisplayValue();

    // Animate level change with proper animation using new animator
    this.animator.animate({
      fromValue: currentValue,
      toValue: this.config.value,
      duration: this.config.refreshAnimationTime,
      easing: this.config.refreshAnimationType,
      onUpdate: newValue => {
        this._drawLevel(newValue);
        if (this.config.pointer) {
          this._updatePointer(newValue);
        }
      },
      onCounterUpdate: this.config.counter
        ? newValue => {
            this._updateCounterText(newValue);
          }
        : null,
      onComplete: () => {
        // Redraw target line after animation completes
        if (hadTargetLine) {
          this._drawTargetLine();
        }

        // Call animation end callback if provided
        if (this.config.onAnimationEnd && typeof this.config.onAnimationEnd === 'function') {
          this.config.onAnimationEnd.call(this);
        }
      },
    });
  }

  /**
   * Update gauge appearance options
   * @param {object|string} options - Options object or option name
   * @param {any} [val] - Option value (if options is string)
   */
  update(options, val) {
    if (typeof options === 'string') {
      this._updateProperty(options, val);
    } else if (options && typeof options === 'object') {
      for (const [option, value] of Object.entries(options)) {
        this._updateProperty(option, value);
      }
    }
  }

  /**
   * Update a single property
   * @param {string} option - Property name
   * @param {any} val - Property value
   * @private
   */
  _updateProperty(option, val) {
    switch (option) {
      case 'valueFontColor':
        if (!isHexColor(val)) {
          console.warn('JustGage: valueFontColor must be a valid hex color'); // eslint-disable-line no-console
          return;
        }
        this.config.valueFontColor = val;
        if (this.canvas.value) {
          this.canvas.value.attr({ fill: val });
        }
        break;

      case 'labelFontColor':
        if (!isHexColor(val)) {
          console.warn('JustGage: labelFontColor must be a valid hex color'); // eslint-disable-line no-console
          return;
        }
        this.config.labelFontColor = val;
        // Update all label elements
        if (this.canvas.min) {
          this.canvas.min.attr({ fill: val });
        }
        if (this.canvas.max) {
          this.canvas.max.attr({ fill: val });
        }
        if (this.canvas.label) {
          this.canvas.label.attr({ fill: val });
        }
        break;

      case 'gaugeColor':
        this.config.gaugeColor = val;
        if (this.canvas.background) {
          this.canvas.background.attr({ fill: val });
        }
        break;

      case 'levelColors':
        this.config.levelColors = val;
        // Redraw level with new colors
        if (this.canvas.level) {
          this.canvas.level.remove();
          this._drawLevel();
        }
        break;

      case 'targetLine':
        this.config.targetLine = val;
        // Remove existing target line
        if (this.canvas.targetLine) {
          this.canvas.targetLine.remove();
          this.canvas.targetLine = null;
        }
        // Draw new target line if value is set
        if (val !== null && val !== undefined) {
          this._drawTargetLine();
        }
        break;

      case 'targetLineColor':
        this.config.targetLineColor = val;
        if (this.canvas.targetLine) {
          this.canvas.targetLine.attr({ stroke: val });
        }
        break;

      case 'targetLineWidth':
        this.config.targetLineWidth = val;
        if (this.canvas.targetLine) {
          this.canvas.targetLine.attr({ 'stroke-width': val });
        }
        break;

      case 'symbol':
        this.config.symbol = val;
        if (this.canvas.value) {
          const displayValue = this._formatValue(this.config.value);
          this.canvas.value.attr({ text: displayValue });
        }
        break;

      case 'decimals':
        this.config.decimals = val;
        if (this.canvas.value) {
          const displayValue = this._formatValue(this.config.value);
          this.canvas.value.attr({ text: displayValue });
        }
        break;

      default:
        console.warn(`JustGage: "${option}" is not a supported update setting`); // eslint-disable-line no-console
    }
  }

  /**
   * Destroy the gauge and clean up resources
   */
  destroy() {
    // Cancel any running animations
    if (this.animator) {
      this.animator.cancel();
    }

    // Clean up SVG renderer
    if (this.renderer) {
      this.renderer.remove();
    }

    // Clear container
    if (this.node?.parentNode) {
      this.node.innerHTML = '';
    }

    // Clear references
    this.node = null;
    this.config = null;
    this.renderer = null;
    this.animator = null;
    this.canvas = null;
  }

  /**
   * Get current gauge value
   * @returns {number} Current value
   */
  getValue() {
    return this.config.value;
  }

  /**
   * Get current configuration
   * @returns {object} Current configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Initialize shadow effects using SVGRenderer
   * @private
   */
  _initializeShadow() {
    const config = this.config;
    const shadowId = 'inner-shadow-' + (config.id || config.classId);

    // Create shadow filter using renderer
    this.renderer.createShadowFilter(shadowId, {
      verticalOffset: config.shadowVerticalOffset,
      size: config.shadowSize,
      opacity: config.shadowOpacity,
    });

    // Apply shadow to gauge elements
    const elementsToShadow = [];
    if (this.canvas.gauge) elementsToShadow.push(this.canvas.gauge);
    if (this.canvas.level) elementsToShadow.push(this.canvas.level);

    this.renderer.applyShadowToElements(shadowId, elementsToShadow);

    // Store shadow ID for later use
    this.shadowId = shadowId;
  }

  /**
   * Start initial gauge animation
   * @private
   */
  _startInitialAnimation() {
    const config = this.config;

    if (config.startAnimationTime <= 0) {
      // No animation, just draw final state
      this._drawLevel(config.value);
      if (config.pointer) {
        this._drawPointer();
      }
      if (config.onAnimationEnd) {
        config.onAnimationEnd();
      }
      return;
    }

    // Start animation from min to target value using new animator
    this.animator.animate({
      fromValue: config.min,
      toValue: config.value,
      duration: config.startAnimationTime,
      easing: config.startAnimationType,
      onUpdate: currentValue => {
        this._drawLevel(currentValue);
        if (config.pointer) {
          this._updatePointer(currentValue);
        }
      },
      onCounterUpdate: config.counter
        ? currentValue => {
            this._updateCounterText(currentValue);
          }
        : null,
      onComplete: config.onAnimationEnd,
    });
  }

  /**
   * Update pointer position during animation
   * @private
   */
  _updatePointer(value) {
    if (this.canvas.pointer) {
      this.canvas.pointer.remove();
    }

    // Temporarily update config value for pointer calculation
    const originalValue = this.config.value;
    this.config.value = value;
    this._drawPointer();
    this.config.value = originalValue;
  }

  /**
   * Update counter text during animation
   * @private
   */
  _updateCounterText(value) {
    const config = this.config;
    let displayValue = value;

    // Apply text formatting
    if (config.textRenderer && config.textRenderer(displayValue) !== false) {
      displayValue = config.textRenderer(displayValue);
    } else {
      displayValue = this._formatDisplayText(value, config, 'value');
    }

    if (this.canvas.value && !this.config.hideValue) {
      this.canvas.value.attr({ text: displayValue });
    }
  }

  /**
   * Get current display value for animation starting point
   * @private
   */
  _getCurrentDisplayValue() {
    // Try to extract current value from level path or use stored value
    return this.config.value || this.config.min;
  }
}
