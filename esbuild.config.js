/* eslint-disable no-console */
import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import pkgJson from './package.json' with { type: 'json' };

const version = pkgJson.version;
const distDir = 'dist';

/** @type {import('esbuild').BuildOptions} */
const baseConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  sourcemap: true,
  target: 'es2020',
  platform: 'browser',
  plugins: [
    {
      name: 'resolve-package-json',
      setup(build) {
        // when importing 'package.json' we want to provide a custom object like { version: '1.2.3' }

        build.onResolve({ filter: /package\.json$/ }, args => {
          return {
            path: args.path,
            namespace: 'package-json',
          };
        });

        build.onLoad({ filter: /.*/, namespace: 'package-json' }, () => {
          return {
            contents: JSON.stringify({ version }),
            loader: 'json',
          };
        });
      },
    },
  ],
  external: [],
  minify: false,
  keepNames: true,
  treeShaking: true,
};

/** @type {import('esbuild').BuildOptions[]} */
const configs = [
  // ES Module build
  {
    ...baseConfig,
    format: 'esm',
    outfile: `${distDir}/justgage.esm.js`,
    banner: {
      js: `// JustGage v${version} - Modern ES6+ SVG Gauges\n// Zero dependencies, native SVG rendering\n`,
    },
  },

  // UMD build for browsers - expose constructor on window/global
  {
    ...baseConfig,
    format: 'iife',
    outfile: `${distDir}/justgage.umd.js`,
    globalName: 'JustGage',
    platform: 'browser',
    banner: {
      js: `// JustGage v${version} - UMD build\n// Zero dependencies, native SVG rendering\n`,
    },
    footer: {
      js: `window.JustGage = JustGage.default;`,
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
      js: `// JustGage v${version} - Minified ES Module\n`,
    },
  },

  // Minified UMD - same footer to expose constructor
  {
    ...baseConfig,
    format: 'iife',
    outfile: `${distDir}/justgage.umd.min.js`,
    globalName: 'JustGage',
    platform: 'browser',
    minify: true,
    keepNames: false,
    banner: {
      js: `// JustGage v${version} - Minified UMD\n`,
    },
    footer: {
      js: `window.JustGage = JustGage.default;`,
    },
  },
];

// Build all configurations
async function buildAll(watchMode = false) {
  if (await fs.stat(distDir).catch(() => false)) {
    console.log('🧹 Cleaning output directory...');
    await fs.rm(distDir, { recursive: true, force: true });
  }

  console.log(`🚀 Building JustGage v${version} with esbuild...`);

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

const watchMode = process.argv.includes('--watch');
buildAll(watchMode).catch(console.error);
