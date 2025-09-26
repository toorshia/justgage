import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  // Base configuration
  js.configs.recommended,
  prettier,

  // Global configuration
  {
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      prettier: prettierPlugin,
    },

    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-global-assign': 'error',
      'no-implicit-globals': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },

  // Ignore patterns
  {
    ignores: [
      'dist/',
      'docs/',
      'node_modules/',
      '*.min.js',
      'justgage.js', // Legacy file
      'raphael.min.js', // Legacy dependency
    ],
  },
];
