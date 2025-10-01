/**
 * JustGage - Modern SVG Gauges
 * Entry point for the library
 *
 */

import { JustGage } from './core/JustGage.js';
import pkgJson from '../package.json' with { type: 'json' };

JustGage.VERSION = pkgJson.version;

// Export the main class
export { JustGage };

// Default export for easier importing
export default JustGage;
