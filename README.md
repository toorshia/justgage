# JustGage

<p align="center"><img src="docs/img/logo.png"/></p>

[![NPM Version](https://img.shields.io/npm/v/justgage.svg)](https://www.npmjs.com/package/justgage)
[![Downloads](https://img.shields.io/npm/dm/justgage.svg)](https://www.npmjs.com/package/justgage)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/justgage.svg)](https://bundlephobia.com/package/justgage)

[![Deploy Docs](https://github.com/toorshia/justgage/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/toorshia/justgage/actions/workflows/deploy-docs.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/toorshia/justgage/build.yml?label=tests)](https://github.com/toorshia/justgage/actions/workflows/ci.yml)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT Licence](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/mit-license.php)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

[![NPM](https://nodei.co/npm/justgage.png?downloads=true)](https://nodei.co/npm/justgage/)

JustGage is a handy JavaScript plugin for generating and animating nice &amp; clean dashboard gauges. **Version 2.0+ features a modern ES6+ implementation with native SVG rendering and zero dependencies.**

Live Demo & Documentation Site: [Demo](https://toorshia.github.io/justgage)

> 🚀 **New in v2.0-alpha.1:** Zero dependencies, native SVG APIs, ES6 modules, TypeScript definitions, modular architecture, and significantly smaller bundle size! Migration from RaphaelJS to native browser SVG APIs.

- [JustGage](#justgage)
  - [Getting Started](#getting-started)
    - [NPM Installation (Recommended)](#npm-installation-recommended)
    - [ES6 Module Usage](#es6-module-usage)
    - [Browser Module Usage](#browser-module-usage)
    - [Legacy Browser Support (UMD)](#legacy-browser-support-umd)
    - [CDN Usage](#cdn-usage)
  - [Basic usage](#basic-usage)
  - [Changelog](#changelog)
  - [Contributing](#contributing)
    - [Development Quick Start](#development-quick-start)
    - [Important: Legacy Reference](#important-legacy-reference)
  - [License](#license)
  - [Author \& Maintainers](#author--maintainers)

## Getting Started

### NPM Installation (Recommended)

```bash
npm install justgage --save
```

### ES6 Module Usage

```javascript
import { JustGage } from 'justgage';

const gauge = new JustGage({
  id: 'my-gauge',
  value: 75,
  min: 0,
  max: 100,
});
```

### Browser Module Usage

```html
<script type="module">
  import { JustGage } from './node_modules/justgage/dist/justgage.esm.js';
  // Your code here
</script>
```

### Legacy Browser Support (UMD)

```html
<script src="./node_modules/justgage/dist/justgage.umd.js"></script>
<script>
  const gauge = new JustGage({
    id: 'my-gauge',
    value: 75,
  });
</script>
```

### CDN Usage

```html
<!-- ES Module from CDN -->
<script type="module">
  import { JustGage } from 'https://unpkg.com/justgage@2/dist/justgage.esm.js';
  // Your code here
</script>
```

## Basic usage

**Html**

```html
<div id="gauge"></div>
```

**JS**

```js
var gauge = new JustGage({
  id: 'gauge', // the id of the html element
  value: 50,
  min: 0,
  max: 100,
  decimals: 2,
  gaugeWidthScale: 0.6,
});

// update the value randomly
setInterval(() => {
  gauge.refresh(Math.random() * 100);
}, 5000);
```

## Changelog

Check out the auto-generated [Changelog](CHANGELOG.md)

Or [here](CHANGELOG_OLD.md) you can find the old changelog (up to version 1.2.9)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:

- Development setup and workflow
- Code standards and conventions
- Testing requirements
- Commit message format (Conventional Commits)
- Pull request process

### Development Quick Start

```bash
# Clone and setup
git clone https://github.com/toorshia/justgage.git
cd justgage
npm install

# Development
npm run build          # Build all distributions
npm test              # Run tests
npm run lint          # Check code quality

# Documentation site
cd docs
npm install
npm run dev           # Start development server
```

### Important: Legacy Reference

When working on features or fixes, always check `/docs/public/justgage.js` for the v1.x reference implementation (1728 lines). This file defines the expected behavior and API compatibility for migration from legacy versions.

For more detailed information, see:

- [GitHub Copilot Instructions](.github/copilot-instructions.md)
- [Development Instructions](.copilot/instructions.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## License

This project is licensed under [MIT](LICENSE) License

## Author & Maintainers

- **Original Author**: [Bojan Djuricic](https://github.com/toorshia)
- **v2.0 Modernization & Maintenance**: [Daniel Sorridi (robertsLando)](https://github.com/robertsLando)
