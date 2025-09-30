/**
 * TypeScript definitions for JustGage v2.0
 */

export interface JustGageConfig {
  /** Container element ID */
  id?: string;
  /** Container element object */
  parentNode?: HTMLElement;
  /** Current gauge value */
  value?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Minimum value text override */
  minTxt?: string | false;
  /** Maximum value text override */
  maxTxt?: string | false;
  /** Reverse min and max positions */
  reverse?: boolean;
  /** Gauge width */
  width?: number;
  /** Gauge height */
  height?: number;
  /** Value text color */
  valueFontColor?: string;
  /** Value font family */
  valueFontFamily?: string;
  /** Symbol to show next to value */
  symbol?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Animate number changes */
  counter?: boolean;
  /** Hide the value text */
  hideValue?: boolean;
  /** Hide min/max labels */
  hideMinMax?: boolean;
  /** Gauge width scale factor */
  gaugeWidthScale?: number;
  /** Gauge background color */
  gaugeColor?: string;
  /** Label text */
  label?: string;
  /** Label text color */
  labelFontColor?: string;
  /** Label font family */
  labelFontFamily?: string;
  /** Shadow opacity (0-1) */
  shadowOpacity?: number;
  /** Shadow size */
  shadowSize?: number;
  /** Shadow vertical offset */
  shadowVerticalOffset?: number;
  /** Show inner shadow */
  showInnerShadow?: boolean;
  /** Level colors array */
  levelColors?: string[];
  /** Disable color gradient */
  noGradient?: boolean;
  /** Initial animation duration (ms) */
  startAnimationTime?: number;
  /** Initial animation type */
  startAnimationType?: string;
  /** Refresh animation duration (ms) */
  refreshAnimationTime?: number;
  /** Refresh animation type */
  refreshAnimationType?: string;
  /** Show as donut gauge */
  donut?: boolean;
  /** Donut start angle */
  donutStartAngle?: number;
  /** Differential gauge (fill from center) */
  differential?: boolean;
  /** Relative gauge sizing */
  relativeGaugeSize?: boolean;
  /** Human-friendly number formatting */
  humanFriendly?: boolean;
  /** Human-friendly decimal places */
  humanFriendlyDecimal?: number;
  /** Format numbers with commas */
  formatNumber?: boolean;
  /** Display remaining value to reach max */
  displayRemaining?: boolean;
  /** Custom sectors configuration */
  customSectors?: JustGageCustomSectors;
  /** Show pointer */
  pointer?: boolean;
  /** Pointer configuration */
  pointerOptions?: JustGagePointerOptions;
  /** Target line value */
  targetLine?: number | null;
  /** Target line color */
  targetLineColor?: string;
  /** Target line width */
  targetLineWidth?: number;
  /** Minimum font sizes */
  valueMinFontSize?: number;
  labelMinFontSize?: number;
  minLabelMinFontSize?: number;
  maxLabelMinFontSize?: number;
  /** Text rendering function */
  textRenderer?: ((value: number) => string | false) | null;
  /** Animation end callback */
  onAnimationEnd?: (() => void) | null;
  /** Default configuration to merge */
  defaults?: Partial<JustGageConfig>;
}

export interface JustGageCustomSectors {
  /** Whether lo/hi values are percentages */
  percents?: boolean;
  /** Color ranges */
  ranges?: Array<{
    /** Low value */
    lo: number;
    /** High value */
    hi: number;
    /** Color for this range */
    color: string;
  }>;
}

export interface JustGagePointerOptions {
  /** Top length */
  toplength?: number | null;
  /** Bottom length */
  bottomlength?: number | null;
  /** Bottom width */
  bottomwidth?: number | null;
  /** Stroke style */
  stroke?: string;
  /** Stroke width */
  stroke_width?: number;
  /** Stroke line cap */
  stroke_linecap?: string;
  /** Pointer color */
  color?: string;
}

export declare class JustGage {
  /** Current configuration */
  readonly config: Required<JustGageConfig>;
  /** Container element */
  readonly node: HTMLElement | null;

  /**
   * Create a new gauge
   * @param config - Configuration options
   */
  constructor(config: JustGageConfig);

  /**
   * Update gauge value and optionally min/max/label
   * @param val - New value
   * @param max - New maximum (optional)
   * @param min - New minimum (optional)
   * @param label - New label (optional)
   */
  refresh(val: number, max?: number, min?: number, label?: string): void;

  /**
   * Update gauge appearance options
   * @param options - Options object or option name
   * @param val - Option value (if options is string)
   */
  update(options: Partial<JustGageConfig>): void;
  update(option: string, val: any): void;

  /**
   * Destroy the gauge and clean up
   */
  destroy(): void;

  /**
   * Get current value
   */
  getValue(): number;

  /**
   * Get current configuration (copy)
   */
  getConfig(): Required<JustGageConfig>;




}

export default JustGage;
export const VERSION: string;
