/**
 * JustGage - Modern SVG Gauges
 * Entry point for the library
 *
 */

import { JustGage } from './core/JustGage.js';
import pkgJson from '../package.json' with { type: 'json' };

// Export the main class
export { JustGage };

// Default export for easier importing
export default JustGage;

// Version info
export const VERSION = pkgJson.version;

// For backward compatibility in browser environments
if (typeof window !== 'undefined') {
  window.JustGage = JustGage;
}
