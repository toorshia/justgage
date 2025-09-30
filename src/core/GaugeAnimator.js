/**
 * Animation manager for JustGage
 * Handles smooth animations for gauge elements using requestAnimationFrame
 */
export class GaugeAnimator {
  constructor() {
    this.currentAnimation = null;
  }

  /**
   * Animate gauge from one value to another
   * @param {Object} options - Animation options
   * @param {number} options.fromValue - Starting value
   * @param {number} options.toValue - Target value
   * @param {number} options.duration - Animation duration in ms
   * @param {string} options.easing - Easing type ('linear', '>', '<', '<>', 'bounce')
   * @param {Function} options.onUpdate - Called each frame with current value
   * @param {Function} [options.onComplete] - Called when animation completes
   * @param {Function} [options.onCounterUpdate] - Called for counter text updates
   */
  animate({
    fromValue,
    toValue,
    duration,
    easing = 'linear',
    onUpdate,
    onComplete,
    onCounterUpdate,
  }) {
    // Cancel any existing animation
    this.cancel();

    if (duration <= 0) {
      // No animation, just call update with final value
      if (onUpdate) onUpdate(toValue);
      if (onCounterUpdate) onCounterUpdate(toValue);
      if (onComplete) onComplete();
      return;
    }

    const startTime = Date.now();
    const valueRange = toValue - fromValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Apply easing function
      const easedProgress = this._applyEasing(progress, easing);
      const currentValue = fromValue + valueRange * easedProgress;

      // Update gauge elements
      if (onUpdate) onUpdate(currentValue);
      if (onCounterUpdate) onCounterUpdate(currentValue);

      if (progress < 1) {
        this.currentAnimation = requestAnimationFrame(animate);
      } else {
        // Animation complete
        this.currentAnimation = null;
        if (onUpdate) onUpdate(toValue);
        if (onCounterUpdate) onCounterUpdate(toValue);
        if (onComplete) onComplete();
      }
    };

    // Start animation
    this.currentAnimation = requestAnimationFrame(animate);
  }

  /**
   * Cancel current animation
   */
  cancel() {
    if (this.currentAnimation) {
      cancelAnimationFrame(this.currentAnimation);
      this.currentAnimation = null;
    }
  }

  /**
   * Apply easing function to progress
   * Ref: https://github.com/DmitryBaranovskiy/raphael/blob/master/raphael.js#L4161
   * @private
   */
  _applyEasing(progress, easing) {
    switch (easing) {
      case 'linear':
      case '-':
        return progress;
      case '>':
      case 'easeOut':
      case 'ease-out':
        return Math.pow(progress, 0.48);
      case '<':
      case 'easeIn':
      case 'ease-in':
        return Math.pow(progress, 1.7);
      case '<>':
      case 'easeInOut':
      case 'ease-in-out':
        return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      case 'bounce':
        return this._bounceEasing(progress);
      case 'elastic':
        return (
          Math.pow(2, -10 * progress) * Math.sin(((progress - 0.075) * (2 * Math.PI)) / 0.3) + 1
        );
      case 'backIn':
      case 'back-in': {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return c3 * progress * progress * progress - c1 * progress * progress;
      }
      case 'backOut':
      case 'back-out': {
        const c2 = 1.70158;
        const c4 = c2 + 1;
        return 1 + c4 * Math.pow(progress - 1, 3) + c2 * Math.pow(progress - 1, 2);
      }
      default:
        return progress;
    }
  }

  /**
   * Bounce easing function
   * @private
   */
  _bounceEasing(t) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }

  /**
   * Check if animation is currently running
   */
  isAnimating() {
    return this.currentAnimation !== null;
  }
}
