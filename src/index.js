/**
 * JustGage - Modern SVG Gauges
 * Entry point for the library
 *
 * @version 2.0.0
 * @author Bojan Djuricic (@Toorshia)
 * @license MIT
 */

import { JustGage } from './core/JustGage.js';

// Export the main class
export { JustGage };

// Default export for easier importing
export default JustGage;

// Version info
export const VERSION = '2.0.0';

// For backward compatibility in browser environments
if (typeof window !== 'undefined') {
  window.JustGage = JustGage;
}
