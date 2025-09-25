/* eslint-disable no-console */
import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

const distDir = 'dist';

/** @type {import('esbuild').BuildOptions} */
const baseConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  target: 'es2020',
  platform: 'neutral',
  mainFields: ['module', 'main'],
  external: [], // No external dependencies - everything bundled
  minify: false, // Keep readable for debugging
  keepNames: true,
  treeShaking: true,
};

const configs = [
  // ES Module build
  {
    ...baseConfig,
    format: 'esm',
    outfile: `${distDir}/justgage.esm.js`,
    banner: {
      js: '// JustGage v2.0.0-alpha.1 - Modern ES6+ SVG Gauges\n// Zero dependencies, native SVG rendering\n',
    },
  },

  // CommonJS build
  {
    ...baseConfig,
    format: 'cjs',
    outfile: `${distDir}/justgage.cjs`,
    platform: 'node',
    banner: {
      js: '// JustGage v2.0.0-alpha.1 - CommonJS build\n// Zero dependencies, native SVG rendering\n',
    },
  },

  // UMD build for browsers
  {
    ...baseConfig,
    format: 'iife',
    outfile: `${distDir}/justgage.umd.js`,
    globalName: 'JustGage',
    platform: 'browser',
    banner: {
      js: '// JustGage v2.0.0-alpha.1 - UMD build\n// Zero dependencies, native SVG rendering\n',
    },
  },

  // Minified ES Module
  {
    ...baseConfig,
    format: 'esm',
    outfile: `${distDir}/justgage.esm.min.js`,
    minify: true,
    keepNames: false,
    banner: {
      js: '// JustGage v2.0.0-alpha.1 - Minified ES Module\n',
    },
  },

  // Minified UMD
  {
    ...baseConfig,
    format: 'iife',
    outfile: `${distDir}/justgage.umd.min.js`,
    globalName: 'JustGage',
    platform: 'browser',
    minify: true,
    keepNames: false,
    banner: {
      js: '// JustGage v2.0.0-alpha.1 - Minified UMD\n',
    },
  },
];

// Build all configurations
async function buildAll(watchMode = false) {
  console.log('🚀 Building JustGage v2.0 with esbuild...');

  if (watchMode) {
    console.log('👀 Watch mode enabled - will rebuild on file changes');
  }

  const buildPromises = configs.map(async config => {
    try {
      const buildConfig = { ...config };

      if (watchMode) {
        buildConfig.watch = {
          onRebuild(error, result) {
            if (error) {
              console.error(`❌ Rebuild failed for ${config.outfile}:`, error);
            } else {
              console.log(`✅ Rebuilt: ${config.outfile}`);
              if (result.warnings.length > 0) {
                console.warn(`⚠️  Warnings for ${config.outfile}:`, result.warnings);
              }
            }
          },
        };
      }

      const result = await build(buildConfig);
      const outputFile = config.outfile;
      console.log(`✅ Built: ${outputFile}`);

      // Log any warnings
      if (result.warnings.length > 0) {
        console.warn(`⚠️  Warnings for ${outputFile}:`, result.warnings);
      }

      return result;
    } catch (error) {
      console.error(`❌ Failed to build ${config.outfile}:`, error);
      // eslint-disable-next-line no-undef
      process.exit(1);
    }
  });

  await Promise.all(buildPromises);

  console.log('🎉 All builds completed successfully!');
  console.log('📦 Output files:');

  // Helper to format bytes as human-readable
  function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  const files = await fs.readdir(distDir);
  for (const file of files) {
    const filePath = path.join(distDir, file);
    const stat = await fs.stat(filePath);
    if (stat.isFile()) {
      console.log(`   ${filePath.padEnd(28)} - ${formatSize(stat.size)}`);
    }
  }
  if (watchMode) {
    console.log('👀 Watching for changes... Press Ctrl+C to stop');
  }
}

// Check if watch mode is requested
// eslint-disable-next-line no-undef
const watchMode = process.argv.includes('--watch');
buildAll(watchMode).catch(console.error);
