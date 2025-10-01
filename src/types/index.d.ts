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
  /** Gauge width scale factor */
  gaugeWidthScale?: number;
  /** Gauge background color */
  gaugeColor?: string;
  /** Label text */
  label?: string;
  /** Value text color */
  valueFontColor?: string;
  /** Value font family */
  valueFontFamily?: string;
  /** Value font weight */
  valueFontWeight?: string;
  /** Label text color */
  labelFontColor?: string;
  /** Label font family */
  labelFontFamily?: string;
  /** Label font weight */
  labelFontWeight?: string;
  /** Symbol to show next to value */
  symbol?: string;
  /** Shadow opacity (0-1) */
  shadowOpacity?: number;
  /** Shadow size */
  shadowSize?: number;
  /** Shadow vertical offset */
  shadowVerticalOffset?: number;
  /** Level colors array */
  levelColors?: string[];
  /** Initial animation duration (ms) */
  startAnimationTime?: number;
  /** Initial animation type */
  startAnimationType?: string;
  /** Refresh animation duration (ms) */
  refreshAnimationTime?: number;
  /** Refresh animation type */
  refreshAnimationType?: string;
  /** Donut start angle */
  donutStartAngle?: number;
  /** Minimum font sizes */
  valueMinFontSize?: number;
  labelMinFontSize?: number;
  minLabelMinFontSize?: number;
  maxLabelMinFontSize?: number;
  titleMinFontSize?: number;
  /** Hide the value text */
  hideValue?: boolean;
  /** Hide min/max labels */
  hideMinMax?: boolean;
  /** Show min/max labels */
  showMinMax?: boolean;
  /** Show inner shadow */
  showInnerShadow?: boolean;
  /** Human-friendly number formatting */
  humanFriendly?: boolean;
  /** Human-friendly decimal places */
  humanFriendlyDecimal?: number;
  /** Disable color gradient */
  noGradient?: boolean;
  /** Show as donut gauge */
  donut?: boolean;
  /** Differential gauge (fill from center) */
  differential?: boolean;
  /** Whether gauge size should follow container element size changes (responsive scaling) */
  relativeGaugeSize?: boolean;
  /** Animate number changes */
  counter?: boolean;
  /** Number of decimal places */
  decimals?: number;
  /** Custom sectors configuration */
  customSectors?: JustGageCustomSectors;
  /** Format numbers with commas */
  formatNumber?: boolean;
  /** Show pointer */
  pointer?: boolean;
  /** Pointer configuration */
  pointerOptions?: JustGagePointerOptions;
  /** Display remaining value to reach max */
  displayRemaining?: boolean;
  /** Target line value */
  targetLine?: number | null;
  /** Target line color */
  targetLineColor?: string;
  /** Target line width */
  targetLineWidth?: number;
  /** Text rendering function */
  textRenderer?: ((value: number) => string | false) | null;
  /** Animation end callback */
  onAnimationEnd?: (() => void) | null;
  /** Default configuration to merge */
  defaults?: Partial<JustGageConfig>;
  /** Title text */
  title?: string;
  /** Title font color */
  titleFontColor?: string;
  /** Title font family */
  titleFontFamily?: string;
  /** Title font weight */
  titleFontWeight?: string;
  /** Title position relative to gauge */
  titlePosition?: 'above' | 'below';
  /** Show sector colors as filled gauge instead of current level */
  showSectorColors?: boolean;
}

export interface JustGageCustomSectors {
  /** Whether lo/hi values are percentages (default: false, values are absolute) */
  percents?: boolean;
  /** Array of color ranges - when value falls within a range, use that range's color */
  ranges?: Array<{
    /** Low value (inclusive) */
    lo: number;
    /** High value (inclusive) */
    hi: number;
    /** Color for this range (hex color string) */
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
