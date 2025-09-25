/**
 * Configuration management for JustGage
 */

import { kvLookup, uuid, extend, isUndefined } from '../utils/helpers.js';

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  value: 0,
  min: 0,
  max: 100,
  reverse: false,
  gaugeWidthScale: 1.0,
  gaugeColor: '#edebeb',
  label: '',
  valueFontColor: '#010101',
  valueFontFamily: 'Arial',
  labelFontColor: '#b3b3b3',
  labelFontFamily: 'Arial',
  symbol: '',
  shadowOpacity: 0.2,
  shadowSize: 5,
  shadowVerticalOffset: 3,
  levelColors: ['#a9d70b', '#f9c802', '#ff0000'],
  startAnimationTime: 700,
  startAnimationType: '>',
  refreshAnimationTime: 700,
  refreshAnimationType: '>',
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
  targetLineColor: '#000000',
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
  title: '',
  titleFontColor: '#999999',
  titleFontFamily: 'Arial',
  titleFontSize: 20,
  titleFontWeight: 'normal',
  valueFontSize: 40,
  valueFontWeight: 'normal',
  labelFontSize: 14,
  labelFontWeight: 'normal',
};

/**
 * Create and validate configuration object
 * @param {object} config - User configuration
 * @param {object} dataset - Dataset from DOM element
 * @returns {object} Processed configuration
 */
export function createConfig(config, dataset = {}) {
  if (isUndefined(config)) {
    throw new Error('JustGage: Configuration object is required');
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
    parentNode: kvLookup('parentNode', config, dataset, null),

    // Dimensions
    width: kvLookup('width', config, dataset, DEFAULT_CONFIG.width),
    height: kvLookup('height', config, dataset, DEFAULT_CONFIG.height),

    // Value settings
    value: kvLookup('value', config, dataset, DEFAULT_CONFIG.value, 'float'),
    min: kvLookup('min', config, dataset, DEFAULT_CONFIG.min, 'float'),
    max: kvLookup('max', config, dataset, DEFAULT_CONFIG.max, 'float'),
    minTxt: kvLookup('minTxt', config, dataset, DEFAULT_CONFIG.minTxt),
    maxTxt: kvLookup('maxTxt', config, dataset, DEFAULT_CONFIG.maxTxt),
    reverse: kvLookup('reverse', config, dataset, DEFAULT_CONFIG.reverse),

    // Display settings
    symbol: kvLookup('symbol', config, dataset, DEFAULT_CONFIG.symbol),
    decimals: kvLookup('decimals', config, dataset, DEFAULT_CONFIG.decimals),
    counter: kvLookup('counter', config, dataset, DEFAULT_CONFIG.counter),
    hideValue: kvLookup('hideValue', config, dataset, DEFAULT_CONFIG.hideValue),
    hideMinMax: kvLookup('hideMinMax', config, dataset, DEFAULT_CONFIG.hideMinMax),
    showMinMax: kvLookup('showMinMax', config, dataset, DEFAULT_CONFIG.showMinMax),

    // Fonts and colors
    valueFontColor: kvLookup('valueFontColor', config, dataset, DEFAULT_CONFIG.valueFontColor),
    valueFontFamily: kvLookup('valueFontFamily', config, dataset, DEFAULT_CONFIG.valueFontFamily),
    labelFontColor: kvLookup('labelFontColor', config, dataset, DEFAULT_CONFIG.labelFontColor),
    labelFontFamily: kvLookup('labelFontFamily', config, dataset, DEFAULT_CONFIG.labelFontFamily),

    // Font sizes
    valueMinFontSize: kvLookup(
      'valueMinFontSize',
      config,
      dataset,
      DEFAULT_CONFIG.valueMinFontSize
    ),
    labelMinFontSize: kvLookup(
      'labelMinFontSize',
      config,
      dataset,
      DEFAULT_CONFIG.labelMinFontSize
    ),
    minLabelMinFontSize: kvLookup(
      'minLabelMinFontSize',
      config,
      dataset,
      DEFAULT_CONFIG.minLabelMinFontSize
    ),
    maxLabelMinFontSize: kvLookup(
      'maxLabelMinFontSize',
      config,
      dataset,
      DEFAULT_CONFIG.maxLabelMinFontSize
    ),

    // Gauge appearance
    gaugeWidthScale: kvLookup('gaugeWidthScale', config, dataset, DEFAULT_CONFIG.gaugeWidthScale),
    gaugeColor: kvLookup('gaugeColor', config, dataset, DEFAULT_CONFIG.gaugeColor),
    levelColors: kvLookup('levelColors', config, dataset, DEFAULT_CONFIG.levelColors),
    noGradient: kvLookup('noGradient', config, dataset, DEFAULT_CONFIG.noGradient),

    // Shadow settings
    shadowOpacity: kvLookup('shadowOpacity', config, dataset, DEFAULT_CONFIG.shadowOpacity),
    shadowSize: kvLookup('shadowSize', config, dataset, DEFAULT_CONFIG.shadowSize),
    shadowVerticalOffset: kvLookup(
      'shadowVerticalOffset',
      config,
      dataset,
      DEFAULT_CONFIG.shadowVerticalOffset
    ),
    showInnerShadow: kvLookup('showInnerShadow', config, dataset, DEFAULT_CONFIG.showInnerShadow),

    // Animation settings
    startAnimationTime: kvLookup(
      'startAnimationTime',
      config,
      dataset,
      DEFAULT_CONFIG.startAnimationTime
    ),
    startAnimationType: kvLookup(
      'startAnimationType',
      config,
      dataset,
      DEFAULT_CONFIG.startAnimationType
    ),
    refreshAnimationTime: kvLookup(
      'refreshAnimationTime',
      config,
      dataset,
      DEFAULT_CONFIG.refreshAnimationTime
    ),
    refreshAnimationType: kvLookup(
      'refreshAnimationType',
      config,
      dataset,
      DEFAULT_CONFIG.refreshAnimationType
    ),

    // Gauge types
    donut: kvLookup('donut', config, dataset, DEFAULT_CONFIG.donut),
    donutStartAngle: kvLookup('donutStartAngle', config, dataset, DEFAULT_CONFIG.donutStartAngle),
    differential: kvLookup('differential', config, dataset, DEFAULT_CONFIG.differential),
    relativeGaugeSize: kvLookup(
      'relativeGaugeSize',
      config,
      dataset,
      DEFAULT_CONFIG.relativeGaugeSize
    ),

    // Advanced features
    customSectors: kvLookup('customSectors', config, dataset, DEFAULT_CONFIG.customSectors),
    pointer: kvLookup('pointer', config, dataset, DEFAULT_CONFIG.pointer),
    pointerOptions: kvLookup('pointerOptions', config, dataset, DEFAULT_CONFIG.pointerOptions),
    targetLine: kvLookup('targetLine', config, dataset, DEFAULT_CONFIG.targetLine, 'float'),
    targetLineColor: kvLookup('targetLineColor', config, dataset, DEFAULT_CONFIG.targetLineColor),
    targetLineWidth: kvLookup('targetLineWidth', config, dataset, DEFAULT_CONFIG.targetLineWidth),

    // Number formatting
    humanFriendly: kvLookup('humanFriendly', config, dataset, DEFAULT_CONFIG.humanFriendly),
    humanFriendlyDecimal: kvLookup(
      'humanFriendlyDecimal',
      config,
      dataset,
      DEFAULT_CONFIG.humanFriendlyDecimal
    ),
    formatNumber: kvLookup('formatNumber', config, dataset, DEFAULT_CONFIG.formatNumber),
    displayRemaining: kvLookup(
      'displayRemaining',
      config,
      dataset,
      DEFAULT_CONFIG.displayRemaining
    ),

    // Label
    label: kvLookup('label', config, dataset, DEFAULT_CONFIG.label),

    // Title configuration
    title: kvLookup('title', config, dataset, DEFAULT_CONFIG.title),
    titleFontColor: kvLookup('titleFontColor', config, dataset, DEFAULT_CONFIG.titleFontColor),
    titleFontFamily: kvLookup('titleFontFamily', config, dataset, DEFAULT_CONFIG.titleFontFamily),
    titleFontSize: kvLookup('titleFontSize', config, dataset, DEFAULT_CONFIG.titleFontSize),
    titleFontWeight: kvLookup('titleFontWeight', config, dataset, DEFAULT_CONFIG.titleFontWeight),

    // Value font configuration
    valueFontSize: kvLookup('valueFontSize', config, dataset, DEFAULT_CONFIG.valueFontSize),
    valueFontWeight: kvLookup('valueFontWeight', config, dataset, DEFAULT_CONFIG.valueFontWeight),

    // Label font configuration
    labelFontSize: kvLookup('labelFontSize', config, dataset, DEFAULT_CONFIG.labelFontSize),
    labelFontWeight: kvLookup('labelFontWeight', config, dataset, DEFAULT_CONFIG.labelFontWeight),

    // Gauge angles
    startAngle: kvLookup('startAngle', config, dataset, DEFAULT_CONFIG.startAngle),
    endAngle: kvLookup('endAngle', config, dataset, DEFAULT_CONFIG.endAngle),

    // Callbacks
    textRenderer: kvLookup('textRenderer', config, dataset, DEFAULT_CONFIG.textRenderer),
    onAnimationEnd: kvLookup('onAnimationEnd', config, dataset, DEFAULT_CONFIG.onAnimationEnd),
  };

  return validateConfig(processedConfig);
}

/**
 * Validate configuration values
 * @param {object} config - Configuration to validate
 * @returns {object} Validated configuration
 */
function validateConfig(config) {
  // Clamp value within min/max range
  if (config.value > config.max) config.value = config.max;
  if (config.value < config.min) config.value = config.min;

  // Validate required fields
  if (!config.id && !config.parentNode) {
    throw new Error('JustGage: Either id or parentNode must be provided');
  }

  // Validate min/max range
  if (config.min >= config.max) {
    throw new Error('JustGage: min value must be less than max value');
  }

  // Ensure levelColors is a valid array
  if (!Array.isArray(config.levelColors) || config.levelColors.length === 0) {
    config.levelColors = DEFAULT_CONFIG.levelColors;
  }

  return config;
}
