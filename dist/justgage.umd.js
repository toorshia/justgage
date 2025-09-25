// JustGage v2.0.0-alpha.1 - UMD build
// Zero dependencies, native SVG rendering

var JustGage = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    JustGage: () => JustGage,
    VERSION: () => VERSION,
    default: () => src_default
  });

  // src/utils/helpers.js
  function isUndefined(v) {
    return v === null || v === void 0;
  }
  __name(isUndefined, "isUndefined");
  function isNumber(n) {
    return n !== null && n !== void 0 && !isNaN(n);
  }
  __name(isNumber, "isNumber");
  function extend(out, ...sources) {
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
  __name(extend, "extend");
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  __name(uuid, "uuid");
  function kvLookup(key, tableA, tableB, defVal, dataType) {
    let val = defVal;
    let canConvert = false;
    if (!isUndefined(key)) {
      if (!isUndefined(tableB) && typeof tableB === "object" && key in tableB) {
        val = tableB[key];
        canConvert = true;
      } else if (!isUndefined(tableA) && typeof tableA === "object" && key in tableA) {
        val = tableA[key];
        canConvert = true;
      } else {
        val = defVal;
      }
      if (canConvert && !isUndefined(dataType)) {
        switch (dataType) {
          case "int":
            val = parseInt(val, 10);
            break;
          case "float":
            val = parseFloat(val);
            break;
          default:
            break;
        }
      }
    }
    return val;
  }
  __name(kvLookup, "kvLookup");

  // src/core/config.js
  var DEFAULT_CONFIG = {
    value: 0,
    min: 0,
    max: 100,
    reverse: false,
    gaugeWidthScale: 1,
    gaugeColor: "#edebeb",
    label: "",
    valueFontColor: "#010101",
    valueFontFamily: "Arial",
    labelFontColor: "#b3b3b3",
    labelFontFamily: "Arial",
    symbol: "",
    shadowOpacity: 0.2,
    shadowSize: 5,
    shadowVerticalOffset: 3,
    levelColors: ["#a9d70b", "#f9c802", "#ff0000"],
    startAnimationTime: 700,
    startAnimationType: ">",
    refreshAnimationTime: 700,
    refreshAnimationType: ">",
    donutStartAngle: 90,
    valueMinFontSize: 16,
    labelMinFontSize: 10,
    minLabelMinFontSize: 10,
    maxLabelMinFontSize: 10,
    hideValue: false,
    hideMinMax: false,
    showMinMax: true,
    showInnerShadow: false,
    humanFriendly: false,
    humanFriendlyDecimal: 0,
    noGradient: false,
    donut: false,
    differential: false,
    relativeGaugeSize: false,
    counter: false,
    decimals: 0,
    customSectors: {},
    formatNumber: false,
    pointer: false,
    pointerOptions: {},
    displayRemaining: false,
    targetLine: null,
    targetLineColor: "#000000",
    targetLineWidth: 1.5,
    textRenderer: null,
    onAnimationEnd: null,
    minTxt: false,
    maxTxt: false,
    defaults: false,
    parentNode: null,
    width: 400,
    height: 320,
    startAngle: 135,
    endAngle: 405,
    title: "",
    titleFontColor: "#999999",
    titleFontFamily: "Arial",
    titleFontSize: null,
    // Will use dynamic calculation if not specified
    titleFontWeight: "normal",
    valueFontSize: null,
    // Will use dynamic calculation if not specified
    valueFontWeight: "normal",
    labelFontSize: null,
    // Will use dynamic calculation if not specified
    labelFontWeight: "normal",
    minMaxLabelFontSize: null
    // Will use dynamic calculation if not specified
  };
  function createConfig(config, dataset = {}) {
    if (isUndefined(config)) {
      throw new Error("JustGage: Configuration object is required");
    }
    const { defaults, ...restConfig } = config;
    if (defaults) {
      config = extend({}, defaults, restConfig);
    }
    const processedConfig = {
      // Generate unique class ID for styling
      classId: uuid(),
      // Core identification
      id: config.id,
      parentNode: kvLookup("parentNode", config, dataset, null),
      // Dimensions
      width: kvLookup("width", config, dataset, DEFAULT_CONFIG.width),
      height: kvLookup("height", config, dataset, DEFAULT_CONFIG.height),
      // Value settings
      value: kvLookup("value", config, dataset, DEFAULT_CONFIG.value, "float"),
      min: kvLookup("min", config, dataset, DEFAULT_CONFIG.min, "float"),
      max: kvLookup("max", config, dataset, DEFAULT_CONFIG.max, "float"),
      minTxt: kvLookup("minTxt", config, dataset, DEFAULT_CONFIG.minTxt),
      maxTxt: kvLookup("maxTxt", config, dataset, DEFAULT_CONFIG.maxTxt),
      reverse: kvLookup("reverse", config, dataset, DEFAULT_CONFIG.reverse),
      // Display settings
      symbol: kvLookup("symbol", config, dataset, DEFAULT_CONFIG.symbol),
      decimals: kvLookup("decimals", config, dataset, DEFAULT_CONFIG.decimals),
      counter: kvLookup("counter", config, dataset, DEFAULT_CONFIG.counter),
      hideValue: kvLookup("hideValue", config, dataset, DEFAULT_CONFIG.hideValue),
      hideMinMax: kvLookup("hideMinMax", config, dataset, DEFAULT_CONFIG.hideMinMax),
      showMinMax: kvLookup("showMinMax", config, dataset, DEFAULT_CONFIG.showMinMax),
      // Fonts and colors
      valueFontColor: kvLookup("valueFontColor", config, dataset, DEFAULT_CONFIG.valueFontColor),
      valueFontFamily: kvLookup("valueFontFamily", config, dataset, DEFAULT_CONFIG.valueFontFamily),
      labelFontColor: kvLookup("labelFontColor", config, dataset, DEFAULT_CONFIG.labelFontColor),
      labelFontFamily: kvLookup("labelFontFamily", config, dataset, DEFAULT_CONFIG.labelFontFamily),
      // Font sizes
      valueMinFontSize: kvLookup(
        "valueMinFontSize",
        config,
        dataset,
        DEFAULT_CONFIG.valueMinFontSize
      ),
      labelMinFontSize: kvLookup(
        "labelMinFontSize",
        config,
        dataset,
        DEFAULT_CONFIG.labelMinFontSize
      ),
      minLabelMinFontSize: kvLookup(
        "minLabelMinFontSize",
        config,
        dataset,
        DEFAULT_CONFIG.minLabelMinFontSize
      ),
      maxLabelMinFontSize: kvLookup(
        "maxLabelMinFontSize",
        config,
        dataset,
        DEFAULT_CONFIG.maxLabelMinFontSize
      ),
      // Gauge appearance
      gaugeWidthScale: kvLookup("gaugeWidthScale", config, dataset, DEFAULT_CONFIG.gaugeWidthScale),
      gaugeColor: kvLookup("gaugeColor", config, dataset, DEFAULT_CONFIG.gaugeColor),
      levelColors: kvLookup("levelColors", config, dataset, DEFAULT_CONFIG.levelColors),
      noGradient: kvLookup("noGradient", config, dataset, DEFAULT_CONFIG.noGradient),
      // Shadow settings
      shadowOpacity: kvLookup("shadowOpacity", config, dataset, DEFAULT_CONFIG.shadowOpacity),
      shadowSize: kvLookup("shadowSize", config, dataset, DEFAULT_CONFIG.shadowSize),
      shadowVerticalOffset: kvLookup(
        "shadowVerticalOffset",
        config,
        dataset,
        DEFAULT_CONFIG.shadowVerticalOffset
      ),
      showInnerShadow: kvLookup("showInnerShadow", config, dataset, DEFAULT_CONFIG.showInnerShadow),
      // Animation settings
      startAnimationTime: kvLookup(
        "startAnimationTime",
        config,
        dataset,
        DEFAULT_CONFIG.startAnimationTime
      ),
      startAnimationType: kvLookup(
        "startAnimationType",
        config,
        dataset,
        DEFAULT_CONFIG.startAnimationType
      ),
      refreshAnimationTime: kvLookup(
        "refreshAnimationTime",
        config,
        dataset,
        DEFAULT_CONFIG.refreshAnimationTime
      ),
      refreshAnimationType: kvLookup(
        "refreshAnimationType",
        config,
        dataset,
        DEFAULT_CONFIG.refreshAnimationType
      ),
      // Gauge types
      donut: kvLookup("donut", config, dataset, DEFAULT_CONFIG.donut),
      donutStartAngle: kvLookup("donutStartAngle", config, dataset, DEFAULT_CONFIG.donutStartAngle),
      differential: kvLookup("differential", config, dataset, DEFAULT_CONFIG.differential),
      relativeGaugeSize: kvLookup(
        "relativeGaugeSize",
        config,
        dataset,
        DEFAULT_CONFIG.relativeGaugeSize
      ),
      // Advanced features
      customSectors: kvLookup("customSectors", config, dataset, DEFAULT_CONFIG.customSectors),
      pointer: kvLookup("pointer", config, dataset, DEFAULT_CONFIG.pointer),
      pointerOptions: kvLookup("pointerOptions", config, dataset, DEFAULT_CONFIG.pointerOptions),
      targetLine: kvLookup("targetLine", config, dataset, DEFAULT_CONFIG.targetLine, "float"),
      targetLineColor: kvLookup("targetLineColor", config, dataset, DEFAULT_CONFIG.targetLineColor),
      targetLineWidth: kvLookup("targetLineWidth", config, dataset, DEFAULT_CONFIG.targetLineWidth),
      // Number formatting
      humanFriendly: kvLookup("humanFriendly", config, dataset, DEFAULT_CONFIG.humanFriendly),
      humanFriendlyDecimal: kvLookup(
        "humanFriendlyDecimal",
        config,
        dataset,
        DEFAULT_CONFIG.humanFriendlyDecimal
      ),
      formatNumber: kvLookup("formatNumber", config, dataset, DEFAULT_CONFIG.formatNumber),
      displayRemaining: kvLookup(
        "displayRemaining",
        config,
        dataset,
        DEFAULT_CONFIG.displayRemaining
      ),
      // Label
      label: kvLookup("label", config, dataset, DEFAULT_CONFIG.label),
      // Title configuration
      title: kvLookup("title", config, dataset, DEFAULT_CONFIG.title),
      titleFontColor: kvLookup("titleFontColor", config, dataset, DEFAULT_CONFIG.titleFontColor),
      titleFontFamily: kvLookup("titleFontFamily", config, dataset, DEFAULT_CONFIG.titleFontFamily),
      titleFontSize: kvLookup("titleFontSize", config, dataset, DEFAULT_CONFIG.titleFontSize),
      titleFontWeight: kvLookup("titleFontWeight", config, dataset, DEFAULT_CONFIG.titleFontWeight),
      // Value font configuration
      valueFontSize: kvLookup("valueFontSize", config, dataset, DEFAULT_CONFIG.valueFontSize),
      valueFontWeight: kvLookup("valueFontWeight", config, dataset, DEFAULT_CONFIG.valueFontWeight),
      // Label font configuration
      labelFontSize: kvLookup("labelFontSize", config, dataset, DEFAULT_CONFIG.labelFontSize),
      labelFontWeight: kvLookup("labelFontWeight", config, dataset, DEFAULT_CONFIG.labelFontWeight),
      // Min/Max label font configuration
      minMaxLabelFontSize: kvLookup(
        "minMaxLabelFontSize",
        config,
        dataset,
        DEFAULT_CONFIG.minMaxLabelFontSize
      ),
      // Gauge angles
      startAngle: kvLookup("startAngle", config, dataset, DEFAULT_CONFIG.startAngle),
      endAngle: kvLookup("endAngle", config, dataset, DEFAULT_CONFIG.endAngle),
      // Callbacks
      textRenderer: kvLookup("textRenderer", config, dataset, DEFAULT_CONFIG.textRenderer),
      onAnimationEnd: kvLookup("onAnimationEnd", config, dataset, DEFAULT_CONFIG.onAnimationEnd)
    };
    return validateConfig(processedConfig);
  }
  __name(createConfig, "createConfig");
  function validateConfig(config) {
    if (config.value > config.max)
      config.value = config.max;
    if (config.value < config.min)
      config.value = config.min;
    if (!config.id && !config.parentNode) {
      throw new Error("JustGage: Either id or parentNode must be provided");
    }
    if (config.min >= config.max) {
      throw new Error("JustGage: min value must be less than max value");
    }
    if (!Array.isArray(config.levelColors) || config.levelColors.length === 0) {
      config.levelColors = DEFAULT_CONFIG.levelColors;
    }
    return config;
  }
  __name(validateConfig, "validateConfig");

  // src/rendering/svg.js
  var _SVGRenderer = class _SVGRenderer {
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
      this.elements = /* @__PURE__ */ new Map();
      this.init();
    }
    init() {
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.svg.setAttribute("width", this.width);
      this.svg.setAttribute("height", this.height);
      this.svg.setAttribute("viewBox", `0 0 ${this.width} ${this.height}`);
      this.svg.style.overflow = "hidden";
      this.container.innerHTML = "";
      this.container.appendChild(this.svg);
    }
    /**
     * Create a circle element
     */
    circle(cx, cy, radius) {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", cx);
      circle.setAttribute("cy", cy);
      circle.setAttribute("r", radius);
      this.svg.appendChild(circle);
      return new SVGElement(circle);
    }
    /**
     * Create a rectangle element
     */
    rect(x, y, width, height) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", width);
      rect.setAttribute("height", height);
      this.svg.appendChild(rect);
      return new SVGElement(rect);
    }
    /**
     * Create a path element
     */
    path(pathData) {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);
      this.svg.appendChild(path);
      return new SVGElement(path);
    }
    /**
     * Create a line element
     */
    line(x1, y1, x2, y2) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      this.svg.appendChild(line);
      return new SVGElement(line);
    }
    /**
     * Create a text element
     */
    text(x, y, content) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", x);
      text.setAttribute("y", y);
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
      const rad1 = (startAngle - 90) * Math.PI / 180;
      const rad2 = (endAngle - 90) * Math.PI / 180;
      const x1 = cx + r1 * Math.cos(rad1);
      const y1 = cy + r1 * Math.sin(rad1);
      const x2 = cx + r2 * Math.cos(rad1);
      const y2 = cy + r2 * Math.sin(rad1);
      const x3 = cx + r2 * Math.cos(rad2);
      const y3 = cy + r2 * Math.sin(rad2);
      const x4 = cx + r1 * Math.cos(rad2);
      const y4 = cy + r1 * Math.sin(rad2);
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
        "Z"
      ].join(" ");
    }
    /**
     * Create gauge path using original JustGage algorithm with exact widget parameters
     */
    createGaugePath(value, min, max, widgetW, widgetH, dx, dy, gaugeWidthScale, donut = false, isDiff = false) {
      let alpha;
      let Ro;
      let Ri;
      let Cx;
      let Cy;
      let Xo, Yo, Xi, Yi;
      let path;
      if (min < 0 && !isDiff) {
        max -= min;
        value -= min;
        min = 0;
      }
      if (donut) {
        alpha = (1 - 2 * (value - min) / (max - min)) * Math.PI;
        Ro = widgetW / 2 - widgetW / 30;
        Ri = Ro - widgetW / 6.666666666666667 * gaugeWidthScale;
        Cx = widgetW / 2 + dx;
        Cy = widgetH / 2 + dy;
        Xo = Cx + Ro * Math.cos(alpha);
        Yo = Cy - Ro * Math.sin(alpha);
        Xi = Cx + Ri * Math.cos(alpha);
        Yi = Cy - Ri * Math.sin(alpha);
        path = "M" + (Cx - Ri) + "," + Cy + " ";
        path += "L" + (Cx - Ro) + "," + Cy + " ";
        if (value - min > (max - min) / 2) {
          path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
        }
        path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
        path += "L" + Xi + "," + Yi + " ";
        if (value - min > (max - min) / 2) {
          path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
        }
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
        path += "Z ";
      } else if (isDiff) {
        alpha = (1 - (value - min) / (max - min)) * Math.PI;
        Ro = widgetW / 2 - widgetW / 10;
        Ri = Ro - widgetW / 6.666666666666667 * gaugeWidthScale;
        Cx = widgetW / 2 + dx;
        Cy = widgetH / 1.25 + dy;
        Xo = Cx + Ro * Math.cos(alpha);
        Yo = Cy - Ro * Math.sin(alpha);
        Xi = Cx + Ri * Math.cos(alpha);
        Yi = Cy - Ri * Math.sin(alpha);
        const middle = min + (max - min) / 2;
        const So = value < middle ? 1 : 0;
        const Si = value < middle ? 0 : 1;
        path = "M" + Cx + "," + (Cy - Ri) + " ";
        path += "L" + Cx + "," + (Cy - Ro) + " ";
        path += "A" + Ro + "," + Ro + " 0 0 " + Si + " " + Xo + "," + Yo + " ";
        path += "L" + Xi + "," + Yi + " ";
        path += "A" + Ri + "," + Ri + " 0 0 " + So + " " + Cx + "," + (Cy - Ri) + " ";
        path += "Z ";
      } else {
        alpha = (1 - (value - min) / (max - min)) * Math.PI;
        Ro = widgetW / 2 - widgetW / 10;
        Ri = Ro - widgetW / 6.666666666666667 * gaugeWidthScale;
        Cx = widgetW / 2 + dx;
        Cy = widgetH / 1.25 + dy;
        Xo = Cx + Ro * Math.cos(alpha);
        Yo = Cy - Ro * Math.sin(alpha);
        Xi = Cx + Ri * Math.cos(alpha);
        Yi = Cy - Ri * Math.sin(alpha);
        path = "M" + (Cx - Ri) + "," + Cy + " ";
        path += "L" + (Cx - Ro) + "," + Cy + " ";
        path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
        path += "L" + Xi + "," + Yi + " ";
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
        path += "Z ";
      }
      return path;
    }
    /**
     * Create gauge pointer (triangle path)
     */
    pointer(cx, cy, length, width, angle) {
      const rad = (angle - 90) * Math.PI / 180;
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
  };
  __name(_SVGRenderer, "SVGRenderer");
  var SVGRenderer = _SVGRenderer;
  var _SVGElement = class _SVGElement {
    constructor(element) {
      this.element = element;
    }
    /**
     * Set element attributes
     */
    attr(attrs) {
      if (typeof attrs === "string") {
        return this.element.getAttribute(attrs);
      }
      Object.keys(attrs).forEach((key) => {
        const value = attrs[key];
        switch (key) {
          case "fill":
            this.element.setAttribute("fill", value);
            break;
          case "stroke":
            this.element.setAttribute("stroke", value);
            break;
          case "stroke-width":
          case "strokeWidth":
            this.element.setAttribute("stroke-width", value);
            break;
          case "opacity":
            this.element.setAttribute("opacity", value);
            break;
          case "font-family":
          case "fontFamily":
            this.element.setAttribute("font-family", value);
            break;
          case "font-size":
          case "fontSize":
            this.element.setAttribute("font-size", value);
            break;
          case "font-weight":
          case "fontWeight":
            this.element.setAttribute("font-weight", value);
            break;
          case "text-anchor":
          case "textAnchor":
            this.element.setAttribute("text-anchor", value);
            break;
          case "dominant-baseline":
          case "dominantBaseline":
            this.element.setAttribute("dominant-baseline", value);
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
    animate(attrs, duration = 500, easing = "ease") {
      const element = this.element;
      const transitions = [];
      Object.keys(attrs).forEach((key) => {
        let property = key;
        if (key === "strokeWidth")
          property = "stroke-width";
        if (key === "fontSize")
          property = "font-size";
        transitions.push(`${property} ${duration}ms ${easing}`);
      });
      element.style.transition = transitions.join(", ");
      setTimeout(() => {
        this.attr(attrs);
      }, 10);
      setTimeout(() => {
        element.style.transition = "";
      }, duration + 10);
      return this;
    }
    /**
     * Transform element
     */
    transform(transformString) {
      this.element.setAttribute("transform", transformString);
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
      this.element.style.display = "none";
      return this;
    }
    /**
     * Show element
     */
    show() {
      this.element.style.display = "";
      return this;
    }
    /**
     * Set element text content
     */
    text(content) {
      if (content === void 0) {
        return this.element.textContent;
      }
      this.element.textContent = content;
      return this;
    }
  };
  __name(_SVGElement, "SVGElement");
  var SVGElement = _SVGElement;

  // src/utils/colors.js
  function cutHex(str) {
    return str.charAt(0) === "#" ? str.substring(1, 7) : str;
  }
  __name(cutHex, "cutHex");
  function isHexColor(val) {
    const regExp = /^#([0-9A-Fa-f]{3}){1,2}$/;
    return typeof val === "string" && regExp.test(val);
  }
  __name(isHexColor, "isHexColor");
  function getColor(val, pct, col, noGradient, custSec) {
    let percentage, rval, gval, bval, lower, upper, range, rangePct, pctLower, pctUpper, color;
    const cust = custSec && custSec.ranges && custSec.ranges.length > 0;
    noGradient = noGradient || cust;
    if (cust) {
      if (custSec.percents === true)
        val = pct * 100;
      for (let i = 0; i < custSec.ranges.length; i++) {
        if (val >= custSec.ranges[i].lo && val <= custSec.ranges[i].hi) {
          return custSec.ranges[i].color;
        }
      }
    }
    const no = col.length;
    if (no === 1)
      return col[0];
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
          b: bval
        }
      };
    }
    if (pct === 0) {
      return `rgb(${[colors[0].color.r, colors[0].color.g, colors[0].color.b].join(",")})`;
    }
    for (let j = 0; j < colors.length; j++) {
      if (pct <= colors[j].pct) {
        if (noGradient) {
          return `rgb(${[colors[j].color.r, colors[j].color.g, colors[j].color.b].join(",")})`;
        } else {
          lower = colors[j - 1];
          upper = colors[j];
          range = upper.pct - lower.pct;
          rangePct = (pct - lower.pct) / range;
          pctLower = 1 - rangePct;
          pctUpper = rangePct;
          color = {
            r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
            g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
            b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
          };
          return `rgb(${[color.r, color.g, color.b].join(",")})`;
        }
      }
    }
  }
  __name(getColor, "getColor");

  // src/utils/formatters.js
  function humanFriendlyNumber(n, d) {
    const d2 = Math.pow(10, d);
    const s = " KMGTPE";
    let i = 0;
    const c = 1e3;
    while ((n >= c || n <= -c) && ++i < s.length) {
      n = n / c;
    }
    i = i >= s.length ? s.length - 1 : i;
    return Math.round(n * d2) / d2 + s[i];
  }
  __name(humanFriendlyNumber, "humanFriendlyNumber");
  function formatNumber(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  __name(formatNumber, "formatNumber");

  // src/core/JustGage.js
  var _JustGage = class _JustGage {
    /**
     * Create a new gauge instance
     *
     * @param {object} config - Configuration options for the gauge
     * @param {string} [config.id] - DOM element ID to render gauge (required if parentNode not provided)
     * @param {HTMLElement} [config.parentNode] - DOM element to render gauge (required if id not provided)
     * @param {number} [config.value=0] - Current gauge value
     * @param {number} [config.min=0] - Minimum gauge value
     * @param {number} [config.max=100] - Maximum gauge value
     * @param {string} [config.title=''] - Gauge title text
     * @param {string} [config.label=''] - Gauge label text
     * @param {boolean} [config.reverse=false] - Reverse the gauge direction
     * @param {number} [config.decimals=0] - Number of decimal places for value display
     * @param {string|Array<string>} [config.levelColors=['#a9d70b', '#f9c802', '#ff0000']] - Colors for gauge levels
     * @param {number} [config.startAngle=135] - Starting angle in degrees
     * @param {number} [config.endAngle=45] - Ending angle in degrees
     * @param {boolean} [config.pointer=false] - Show pointer instead of level fill
     * @param {object} [config.pointerOptions={}] - Pointer configuration options
     * @param {Array<object>} [config.customSectors=[]] - Custom color sectors
     * @param {number} [config.width=400] - Gauge width in pixels
     * @param {number} [config.height=320] - Gauge height in pixels
     * @param {string} [config.gaugeColor='#edebeb'] - Background gauge color
     * @param {number} [config.gaugeWidthScale=1.0] - Gauge width scale factor
     * @param {boolean} [config.donut=false] - Create donut-style gauge
     * @param {boolean} [config.counter=false] - Enable counter animation
     * @param {string} [config.symbol=''] - Symbol to display with value
     * @param {function} [config.textRenderer] - Custom text rendering function
     * @param {function} [config.onAnimationEnd] - Animation end callback
     * @throws {Error} When no configuration object is provided
     * @throws {Error} When neither id nor parentNode is provided
     * @throws {Error} When specified DOM element is not found
     * @throws {Error} When min >= max
     */
    constructor(config) {
      this.events = {};
      if (!config) {
        throw new Error("JustGage: Configuration object is required");
      }
      if (config.id) {
        this.node = document.getElementById(config.id);
        if (!this.node) {
          throw new Error(`JustGage: No element with id '${config.id}' found`);
        }
      } else if (config.parentNode) {
        this.node = config.parentNode;
      } else {
        throw new Error("JustGage: Either id or parentNode must be provided");
      }
      const dataset = this.node.dataset || {};
      this.config = createConfig(config, dataset);
      this.originalValue = config.value ?? -1;
      this._initializeGauge();
    }
    /**
     * Initialize the gauge rendering
     * @private
     */
    _initializeGauge() {
      let width = this.config.width;
      let height = this.config.height;
      if (!width || !height) {
        const rect = this.node.getBoundingClientRect();
        if (!width)
          width = rect.width || 400;
        if (!height)
          height = rect.height || 320;
        this.config.width = width;
        this.config.height = height;
      }
      this.renderer = new SVGRenderer(this.node, width, height);
      this.canvas = {
        gauge: null,
        level: null,
        title: null,
        value: null,
        min: null,
        max: null,
        pointer: null
      };
      if (this.config.showInnerShadow) {
        const defs = this.renderer.svg.querySelector("defs") || this.renderer.svg.appendChild(
          document.createElementNS("http://www.w3.org/2000/svg", "defs")
        );
        this.generateShadow(this.renderer.svg, defs);
      }
      this._drawGauge();
    }
    /**
     * Draw the complete gauge
     * @private
     */
    _drawGauge() {
      const config = this.config;
      const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();
      const gaugePath = this.renderer.createGaugePath(
        config.max,
        config.min,
        config.max,
        widgetW,
        widgetH,
        dx,
        dy,
        config.gaugeWidthScale || 1,
        config.donut,
        config.differential
      );
      this.canvas.gauge = this.renderer.path(gaugePath).attr({
        fill: config.gaugeColor,
        stroke: "none"
      });
      this._drawLevel();
      this._drawLabels();
      if (config.pointer) {
        this._drawPointer();
      }
      if (config.targetLine !== null && config.targetLine !== void 0) {
        this._drawTargetLine();
      }
    }
    /**
     * Draw the value level indicator
     * @private
     */
    _drawLevel() {
      const config = this.config;
      const { widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();
      const color = this._getLevelColor(config.value);
      const levelPath = this.renderer.createGaugePath(
        config.value,
        config.min,
        config.max,
        widgetW,
        widgetH,
        dx,
        dy,
        config.gaugeWidthScale || 1,
        config.donut,
        config.differential
      );
      this.canvas.level = this.renderer.path(levelPath).attr({
        fill: color,
        stroke: "none"
      });
    }
    /**
     * Calculate consistent gauge geometry for both arc and text positioning
     * @private
     */
    _calculateGaugeGeometry() {
      const config = this.config;
      const w = config.width;
      const h = config.height;
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
      const cx = dx + widgetW / 2;
      const cy = config.donut ? dy + widgetH / 2 : dy + widgetH / 1.25;
      const outerRadius = config.donut ? widgetW / 2 - widgetW / 30 : widgetW / 2 - widgetW / 10;
      const gaugeWidthScale = config.gaugeWidthScale || 1;
      const innerRadius = outerRadius - widgetW / 6.666666666666667 * gaugeWidthScale;
      return { cx, cy, outerRadius, innerRadius, widgetW, widgetH, dx, dy };
    }
    /**
     * Draw text labels
     * @private
     */
    _drawLabels() {
      const config = this.config;
      const { cx, cy, widgetW, widgetH, dx, dy } = this._calculateGaugeGeometry();
      const titleFontSize = config.titleFontSize || Math.max(widgetH / 16, 10);
      const valueFontSize = config.valueFontSize || (widgetH / 6.4 > 16 ? widgetH / 5.4 : 18);
      if (config.title) {
        this.canvas.title = this.renderer.text(cx, cy - widgetH / 16, config.title).attr({
          "font-family": config.titleFontFamily,
          "font-size": titleFontSize,
          "font-weight": config.titleFontWeight,
          "text-anchor": "middle",
          "dominant-baseline": "central",
          fill: config.titleFontColor
        });
      }
      const displayValue = this._formatValue(config.value);
      const valueX = dx + widgetW / 2;
      const valueY = config.donut ? cy : config.label ? dy + widgetH / 1.85 : dy + widgetH / 1.7;
      this.canvas.value = this.renderer.text(valueX, valueY, displayValue).attr({
        "font-family": config.valueFontFamily,
        "font-size": valueFontSize,
        "font-weight": config.valueFontWeight,
        "text-anchor": "middle",
        "dominant-baseline": "central",
        fill: config.valueFontColor
      });
      const labelFontSize = config.labelFontSize || Math.max(widgetH / 16, 10);
      if (config.label) {
        const labelY = valueY + labelFontSize;
        this.canvas.label = this.renderer.text(valueX, labelY, config.label).attr({
          "font-family": config.labelFontFamily,
          "font-size": labelFontSize,
          "text-anchor": "middle",
          "dominant-baseline": "central",
          fill: config.labelFontColor
        });
      }
      if (config.showMinMax && !config.hideMinMax) {
        const gaugeWidthScale = config.gaugeWidthScale || 1;
        let minMaxLabelY;
        if (config.donut) {
          minMaxLabelY = valueY + labelFontSize;
        } else {
          minMaxLabelY = valueY + valueFontSize / 2 + 5;
        }
        const minX = dx + widgetW / 10 + widgetW / 6.666666666666667 * gaugeWidthScale / 2;
        const maxX = dx + widgetW - widgetW / 10 - widgetW / 6.666666666666667 * gaugeWidthScale / 2;
        const minY = minMaxLabelY;
        const maxY = minMaxLabelY;
        let minText = config.min;
        if (config.minTxt) {
          minText = config.minTxt;
        } else if (config.humanFriendly) {
          minText = this._humanFriendlyNumber(config.min, config.humanFriendlyDecimal);
        } else if (config.formatNumber) {
          minText = this._formatNumber(config.min);
        }
        let maxText = config.max;
        if (config.maxTxt) {
          maxText = config.maxTxt;
        } else if (config.humanFriendly) {
          maxText = this._humanFriendlyNumber(config.max, config.humanFriendlyDecimal);
        } else if (config.formatNumber) {
          maxText = this._formatNumber(config.max);
        }
        const minMaxLabelFontSize = config.minMaxLabelFontSize || Math.max(widgetH / 16, 10);
        if (!config.reverse) {
          this.canvas.min = this.renderer.text(minX, minY, minText).attr({
            "font-family": config.labelFontFamily,
            "font-size": minMaxLabelFontSize,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            fill: config.labelFontColor
          });
          this.canvas.max = this.renderer.text(maxX, maxY, maxText).attr({
            "font-family": config.labelFontFamily,
            "font-size": minMaxLabelFontSize,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            fill: config.labelFontColor
          });
        } else {
          this.canvas.min = this.renderer.text(maxX, maxY, minText).attr({
            "font-family": config.labelFontFamily,
            "font-size": minMaxLabelFontSize,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            fill: config.labelFontColor
          });
          this.canvas.max = this.renderer.text(minX, minY, maxText).attr({
            "font-family": config.labelFontFamily,
            "font-size": minMaxLabelFontSize,
            "text-anchor": "middle",
            "dominant-baseline": "central",
            fill: config.labelFontColor
          });
        }
      }
    }
    /**
     * Draw gauge pointer
     * @private
     */
    _drawPointer() {
      const config = this.config;
      const { cx, cy, outerRadius, widgetW } = this._calculateGaugeGeometry();
      const range = config.max - config.min;
      const ratio = (config.value - config.min) / range;
      let angleRange = config.endAngle - config.startAngle;
      if (angleRange <= 0) {
        angleRange += 360;
      }
      const angle = config.startAngle + ratio * angleRange;
      const topLength = config.pointerOptions.toplength || widgetW * 3.5 / 100;
      const pointerLength = outerRadius + topLength;
      const pointerWidth = config.pointerOptions.bottomwidth || widgetW / 100;
      this.canvas.pointer = this.renderer.pointer(cx, cy, pointerLength, pointerWidth, angle).attr({
        fill: config.pointerOptions.color || "#000000",
        stroke: "none"
      });
    }
    /**
     * Draw target line at specified value
     * @private
     */
    _drawTargetLine() {
      const config = this.config;
      const { cx, cy, outerRadius, innerRadius } = this._calculateGaugeGeometry();
      const range = config.max - config.min;
      const ratio = (config.targetLine - config.min) / range;
      let angleRange = config.endAngle - config.startAngle;
      if (angleRange <= 0) {
        angleRange += 360;
      }
      let targetAngle = config.startAngle + ratio * angleRange;
      if (config.reverse) {
        targetAngle = config.startAngle + (1 - ratio) * angleRange;
      }
      const targetAngleRad = (targetAngle - 90) * Math.PI / 180;
      const lineInnerRadius = innerRadius * 0.9;
      const lineOuterRadius = outerRadius * 1.05;
      const x1 = cx + lineInnerRadius * Math.cos(targetAngleRad);
      const y1 = cy + lineInnerRadius * Math.sin(targetAngleRad);
      const x2 = cx + lineOuterRadius * Math.cos(targetAngleRad);
      const y2 = cy + lineOuterRadius * Math.sin(targetAngleRad);
      this.canvas.targetLine = this.renderer.line(x1, y1, x2, y2).attr({
        stroke: config.targetLineColor,
        "stroke-width": config.targetLineWidth,
        "stroke-linecap": "round"
      });
    }
    /**
     * Get level color based on value
     * @private
     */
    _getLevelColor(value) {
      const config = this.config;
      const range = config.max - config.min;
      const ratio = (value - config.min) / range;
      return getColor(value, ratio, config.levelColors, config.noGradient, config.customSectors);
    }
    /**
     * Format value for display
     * @private
     */
    _formatValue(value) {
      const config = this.config;
      let displayVal = value;
      if (config.textRenderer && typeof config.textRenderer === "function") {
        const renderedValue = config.textRenderer(displayVal);
        if (renderedValue !== false) {
          return renderedValue;
        }
      }
      if (config.humanFriendly) {
        displayVal = this._humanFriendlyNumber(displayVal, config.humanFriendlyDecimal) + config.symbol;
      } else if (config.formatNumber) {
        displayVal = this._formatNumber((displayVal * 1).toFixed(config.decimals)) + config.symbol;
      } else if (config.displayRemaining) {
        displayVal = ((config.max - displayVal) * 1).toFixed(config.decimals) + config.symbol;
      } else {
        displayVal = (displayVal * 1).toFixed(config.decimals) + config.symbol;
      }
      return displayVal;
    }
    /**
     * Convert large numbers to human friendly format (e.g. 1234567 -> 1.23M)
     * @param {number} n - Number to format
     * @param {number} d - Decimal places
     * @returns {string} Human friendly number
     * @private
     */
    _humanFriendlyNumber(n, d) {
      return humanFriendlyNumber(n, d);
    }
    /**
     * Format number with commas
     * @param {string|number} x - Number to format
     * @returns {string} Formatted number
     * @private
     */
    _formatNumber(x) {
      return formatNumber(x);
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
        throw new Error("JustGage: refresh() requires a numeric value");
      }
      const displayVal = val;
      if (label !== null && label !== void 0) {
        this.config.label = label;
        if (this.canvas.label) {
          this.canvas.label.attr({ text: this.config.label });
        }
      }
      if (isNumber(min)) {
        this.config.min = min;
        if (this.canvas.min) {
          let minText = this.config.min;
          if (this.config.minTxt) {
            minText = this.config.minTxt;
          } else if (this.config.humanFriendly) {
            minText = this._humanFriendlyNumber(this.config.min, this.config.humanFriendlyDecimal);
          } else if (this.config.formatNumber) {
            minText = this._formatNumber(this.config.min);
          }
          this.canvas.min.attr({ text: minText });
        }
      }
      if (isNumber(max)) {
        this.config.max = max;
        if (this.canvas.max) {
          let maxText = this.config.max;
          if (this.config.maxTxt) {
            maxText = this.config.maxTxt;
          } else if (this.config.humanFriendly) {
            maxText = this._humanFriendlyNumber(this.config.max, this.config.humanFriendlyDecimal);
          } else if (this.config.formatNumber) {
            maxText = this._formatNumber(this.config.max);
          }
          this.canvas.max.attr({ text: maxText });
        }
      }
      if (val * 1 > this.config.max * 1) {
        val = this.config.max * 1;
      }
      if (val * 1 < this.config.min * 1) {
        val = this.config.min * 1;
      }
      this.config.value = val * 1;
      if (!this.config.counter && this.canvas.value) {
        const formattedValue = this._formatValue(displayVal);
        this.canvas.value.attr({ text: formattedValue });
      }
      if (this.canvas.level) {
        this.canvas.level.remove();
        this._drawLevel();
      }
      if (this.config.pointer && this.canvas.pointer) {
        this.canvas.pointer.remove();
        this._drawPointer();
      }
      if (this.config.onAnimationEnd && typeof this.config.onAnimationEnd === "function") {
        setTimeout(() => {
          this.config.onAnimationEnd.call(this);
        }, this.config.refreshAnimationTime);
      }
    }
    /**
     * Update gauge appearance options
     * @param {object|string} options - Options object or option name
     * @param {any} [val] - Option value (if options is string)
     */
    update(options, val) {
      if (typeof options === "string") {
        this._updateProperty(options, val);
      } else if (options && typeof options === "object") {
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
        case "valueFontColor":
          if (!isHexColor(val)) {
            console.warn("JustGage: valueFontColor must be a valid hex color");
            return;
          }
          this.config.valueFontColor = val;
          if (this.canvas.value) {
            this.canvas.value.attr({ fill: val });
          }
          break;
        case "labelFontColor":
          if (!isHexColor(val)) {
            console.warn("JustGage: labelFontColor must be a valid hex color");
            return;
          }
          this.config.labelFontColor = val;
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
        case "gaugeColor":
          this.config.gaugeColor = val;
          if (this.canvas.background) {
            this.canvas.background.attr({ fill: val });
          }
          break;
        case "levelColors":
          this.config.levelColors = val;
          if (this.canvas.level) {
            this.canvas.level.remove();
            this._drawLevel();
          }
          break;
        case "targetLine":
          this.config.targetLine = val;
          if (this.canvas.targetLine) {
            this.canvas.targetLine.remove();
            this.canvas.targetLine = null;
          }
          if (val !== null && val !== void 0) {
            this._drawTargetLine();
          }
          break;
        case "targetLineColor":
          this.config.targetLineColor = val;
          if (this.canvas.targetLine) {
            this.canvas.targetLine.attr({ stroke: val });
          }
          break;
        case "targetLineWidth":
          this.config.targetLineWidth = val;
          if (this.canvas.targetLine) {
            this.canvas.targetLine.attr({ "stroke-width": val });
          }
          break;
        case "symbol":
          this.config.symbol = val;
          if (this.canvas.value) {
            const displayValue = this._formatValue(this.config.value);
            this.canvas.value.attr({ text: displayValue });
          }
          break;
        case "decimals":
          this.config.decimals = val;
          if (this.canvas.value) {
            const displayValue = this._formatValue(this.config.value);
            this.canvas.value.attr({ text: displayValue });
          }
          break;
        default:
          console.warn(`JustGage: "${option}" is not a supported update setting`);
      }
    }
    /**
     * Update visual elements
     * @private
     */
    _updateVisuals() {
      if (!this.canvas || !this.renderer)
        return;
      if (this.canvas.level) {
        this.canvas.level.remove();
      }
      this._drawLevel();
      if (this.canvas.value) {
        const displayValue = this._formatValue(this.config.value);
        this.canvas.value.text(displayValue);
      }
      if (this.config.pointer && this.canvas.pointer) {
        this.canvas.pointer.remove();
        this._drawPointer();
      }
    }
    /**
     * Destroy the gauge and clean up resources
     */
    destroy() {
      if (this.renderer) {
        this.renderer.remove();
      }
      if (this.node?.parentNode) {
        this.node.innerHTML = "";
      }
      for (const event in this.events) {
        delete this.events[event];
      }
      this.node = null;
      this.config = null;
      this.events = {};
      this.renderer = null;
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
     * Add event listener
     * @param {string} eventName - Event name
     * @param {Function} callback - Event callback
     */
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }
    /**
     * Remove event listener
     * @param {string} eventName - Event name
     * @param {Function} [callback] - Specific callback to remove
     */
    off(eventName, callback) {
      if (!this.events[eventName])
        return;
      if (callback) {
        const index = this.events[eventName].indexOf(callback);
        if (index > -1) {
          this.events[eventName].splice(index, 1);
        }
      } else {
        this.events[eventName] = [];
      }
    }
    /**
     * Emit event
     * @param {string} eventName - Event name
     * @param {...any} args - Event arguments
     * @private
     */
    _emit(eventName, ...args) {
      if (this.events[eventName]) {
        this.events[eventName].forEach((callback) => {
          try {
            callback.apply(this, args);
          } catch (error) {
            console.error(`JustGage: Error in ${eventName} event handler:`, error);
          }
        });
      }
    }
    /**
     * Generate shadow filter for inner shadow effect
     * @param {SVGElement} svg - SVG element
     * @param {SVGElement} defs - Defs element for filters
     */
    generateShadow(svg, defs) {
      const config = this.config;
      const shadowId = "inner-shadow-" + (config.id || config.classId);
      const filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      filter.setAttribute("id", shadowId);
      defs.appendChild(filter);
      const feOffset = document.createElementNS("http://www.w3.org/2000/svg", "feOffset");
      feOffset.setAttribute("dx", 0);
      feOffset.setAttribute("dy", config.shadowVerticalOffset);
      filter.appendChild(feOffset);
      const feGaussianBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
      feGaussianBlur.setAttribute("result", "offset-blur");
      feGaussianBlur.setAttribute("stdDeviation", config.shadowSize);
      filter.appendChild(feGaussianBlur);
      const feComposite1 = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
      feComposite1.setAttribute("operator", "out");
      feComposite1.setAttribute("in", "SourceGraphic");
      feComposite1.setAttribute("in2", "offset-blur");
      feComposite1.setAttribute("result", "inverse");
      filter.appendChild(feComposite1);
      const feFlood = document.createElementNS("http://www.w3.org/2000/svg", "feFlood");
      feFlood.setAttribute("flood-color", "black");
      feFlood.setAttribute("flood-opacity", config.shadowOpacity);
      feFlood.setAttribute("result", "color");
      filter.appendChild(feFlood);
      const feComposite2 = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
      feComposite2.setAttribute("operator", "in");
      feComposite2.setAttribute("in", "color");
      feComposite2.setAttribute("in2", "inverse");
      feComposite2.setAttribute("result", "shadow");
      filter.appendChild(feComposite2);
      const feComposite3 = document.createElementNS("http://www.w3.org/2000/svg", "feComposite");
      feComposite3.setAttribute("operator", "over");
      feComposite3.setAttribute("in", "shadow");
      feComposite3.setAttribute("in2", "SourceGraphic");
      filter.appendChild(feComposite3);
      if (config.showInnerShadow) {
        if (this.canvas.background) {
          this.canvas.background.attr({ filter: `url(#${shadowId})` });
        }
        if (this.canvas.level) {
          this.canvas.level.attr({ filter: `url(#${shadowId})` });
        }
      }
      return shadowId;
    }
  };
  __name(_JustGage, "JustGage");
  var JustGage = _JustGage;

  // src/index.js
  var src_default = JustGage;
  var VERSION = "2.0.0";
  if (typeof window !== "undefined") {
    window.JustGage = JustGage;
  }
  return __toCommonJS(src_exports);
})();
/**
 * @file JustGage - Modern ES6+ implementation of animated SVG gauges
 * @version 1.7.0
 * @author Bojan Djuricic <pindjur@gmail.com>
 * @license MIT
 */
/**
 * JustGage - Modern SVG Gauges
 * Entry point for the library
 *
 * @version 2.0.0
 * @author Bojan Djuricic (@Toorshia)
 * @license MIT
 */
//# sourceMappingURL=justgage.umd.js.map
