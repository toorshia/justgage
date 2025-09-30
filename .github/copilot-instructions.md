# Copilot Instructions for JustGage

## Project Overview

JustGage is a handy JavaScript plugin for generating and animating nice & clean dashboard gauges. This repository contains:

- **v2.0+ (Modern)**: ES6+ modules with native SVG APIs (located in `/src/`)
- **v1.x (Legacy)**: RaphaelJS-based implementation (reference at `/docs/public/justgage.js`)
- **Documentation**: Vue 3 + Vuetify 3 website (located in `/docs/`)
- **Migration Tools**: Utilities to help users migrate from v1.x to v2.0+ (located in `/migration-utils/`)

## Architecture & Code Standards

### Modern Implementation (v2.0+)

- **Language**: TypeScript/JavaScript ES6+
- **Module System**: ES6 modules with UMD build
- **SVG**: Native SVG APIs (no external dependencies)
- **Build Tool**: ESBuild for fast compilation
- **Testing**: Vitest for unit testing

### Legacy Reference (v1.x)

- **Location**: `/docs/public/justgage.js` (1728 lines)
- **Dependencies**: RaphaelJS for SVG manipulation
- **Architecture**: UMD module pattern
- **Use Case**: Reference for feature parity and migration compatibility

### Documentation Site

- **Framework**: Vue 3 + Composition API
- **UI Library**: Vuetify 3 (Material Design)
- **Features**:
  - Interactive playground with real-time gauge rendering
  - Comprehensive API documentation
  - Migration guides from v1.x to v2.0+
  - Mobile-responsive design with navigation drawers

## Development Guidelines

### Code Style

- Follow **ESLint** configuration (see `eslint.config.js`)
- Use **Prettier** for formatting (see `.prettierrc`)
- Write **TypeScript** with strict type checking
- Use **conventional commit messages** (see Commit Standards below)

### Testing

- Write unit tests for all new features
- Maintain backward compatibility with v1.x API where possible
- Test cross-browser compatibility
- Include performance tests for animation-heavy features

### File Structure

```
/src/                 # Modern v2.0+ implementation
/docs/public/         # Contains legacy v1.x reference (justgage.js)
/docs/            # Vue 3 + Vuetify 3 documentation site
/migration-utils/     # Tools for v1.x to v2.0+ migration
/tests/               # Test suites
/dist/                # Built distribution files
```

## Key Features to Maintain

### Core Gauge Functionality

- **Value Display**: Numeric value with customizable formatting
- **Range Configuration**: Min/max values with validation
- **Animation**: Smooth transitions and initial animations
- **Responsive Design**: Relative gauge sizing for different containers
- **Color Schemes**: Level-based colors and custom gradients
- **Labels & Titles**: Customizable text elements

### Advanced Features

- **Custom Sectors**: Color-coded value ranges
- **Pointer Customization**: Different pointer styles and sizes
- **Event Hooks**: Animation start/end callbacks
- **Value Formatting**: Custom number formatting and symbols
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized for multiple gauges on single page

## API Compatibility

### Constructor Pattern

```javascript
// v2.0+ (Modern)
import JustGage from 'justgage';
const gauge = new JustGage({
  id: 'gauge-container',
  value: 67,
  min: 0,
  max: 100,
});

// v1.x (Legacy Reference)
var gauge = new JustGage({
  id: 'gauge-container',
  value: 67,
  min: 0,
  max: 100,
});
```

### Core Methods

- `refresh(value, max, min, label)` - Update gauge values
- `update(options)` - Update configuration options
- `destroy()` - Clean up and remove gauge

## Migration Considerations

### Breaking Changes in v2.0+

- **No RaphaelJS dependency** - Uses native SVG APIs
- **ES6 modules** - Requires build step or modern browser
- **TypeScript support** - Full type definitions included
- **Performance improvements** - Optimized rendering pipeline

### Compatibility Layer

- Maintain same API surface for easy migration
- Provide migration utilities in `/migration-utils/`
- Document breaking changes clearly
- Offer codemods where possible

## Documentation Standards

### Code Examples

- Always provide both v1.x and v2.0+ examples
- Include TypeScript examples where relevant
- Show responsive and accessibility best practices
- Demonstrate error handling

### API Documentation

- Document all configuration options with types
- Include default values and valid ranges
- Provide visual examples in playground
- Show migration paths from v1.x

## Commit Standards

This project follows **Conventional Commits** specification:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

### Scopes

- `core`: Core gauge functionality
- `api`: Public API changes
- `docs`: Documentation site
- `migration`: Migration utilities
- `playground`: Interactive playground
- `build`: Build configuration
- `types`: TypeScript definitions

### Examples

```
feat(core): add custom sector support for value ranges
fix(api): resolve animation callback timing issues
docs(playground): add responsive gauge size example
refactor(core): migrate from RaphaelJS to native SVG
chore(build): update ESBuild configuration for TypeScript
```

## Performance Guidelines

- **Minimize DOM manipulations** during animations
- **Use requestAnimationFrame** for smooth animations
- **Debounce frequent updates** (like window resize)
- **Lazy load** non-critical features
- **Profile memory usage** with multiple gauge instances

## Browser Support

- **Modern browsers**: Full ES6+ support
- **Legacy browsers**: UMD build with polyfills
- **Mobile**: Touch-friendly and performant
- **Accessibility**: WCAG 2.1 AA compliance

## When Making Changes

1. **Check legacy implementation** in `/docs/public/justgage.js` for feature reference
2. **Maintain API compatibility** where possible
3. **Update documentation** in Vue 3 site
4. **Add playground examples** for new features
5. **Write migration guides** for breaking changes
6. **Follow conventional commits** for all changes
7. **Test cross-browser compatibility**
8. **Consider performance impact** of changes

Refer to `/docs/public/justgage.js` as the definitive v1.x reference implementation when implementing features or understanding expected behavior.# JustGage - GitHub Copilot Instructions

This is a modern ES6+ JavaScript library for creating animated dashboard gauges using native SVG APIs. JustGage provides a clean, simple API for generating SVG-based gauges that are resolution independent and self-adjusting.

## Project Overview

JustGage is a popular gauge visualization library with the following characteristics:

- **Main Technology**: Modern ES6+ JavaScript with native SVG APIs (zero dependencies!)
- **Architecture**: Modular ES6+ class-based design with separate concerns
- **Module System**: ES6 modules with UMD, CommonJS, and ESM builds via esbuild
- **Build System**: esbuild for fast, modern bundling with tree-shaking support
- **Testing**: Node.js native test runner with jsdom for DOM testing, ESLint for code quality
- **Distribution**: Available via NPM with multiple output formats
- **Version**: 1.7.0 (modernized from v1.x RaphaelJS implementation)

## Repository Structure

### Modern Source Structure (v2.x)

- `src/` - Modern ES6+ source code directory
  - `src/index.js` - Main entry point and exports
  - `src/core/JustGage.js` - Main gauge class (857 lines)
  - `src/core/config.js` - Configuration handling and defaults
  - `src/rendering/svg.js` - Native SVG renderer (308 lines)
  - `src/utils/` - Utility functions (helpers, colors, formatters, DOM)
  - `src/types/index.d.ts` - TypeScript definitions
- `tests/` - Node.js native test suite
  - `tests/setup.js` - Test environment setup with jsdom
  - `tests/unit/core.test.js` - Core functionality tests
- `dist/` - Built files for distribution
  - `dist/justgage.esm.js` - ES6 module build
  - `dist/justgage.cjs` - CommonJS build
  - `dist/justgage.umd.js` - UMD build for browsers
- `docs/` - Documentation website and examples
- `docs/examples/` - HTML examples demonstrating various features

### Legacy Files (maintained for compatibility)

- `justgage.js` - Legacy v1.x source (still RaphaelJS-based)
- `index.js` - Legacy NPM entry point
- `raphael.min.js` - RaphaelJS dependency (legacy only)

## Build and Development Workflow

### Prerequisites

- Node.js 18.x (as specified in GitHub Actions)
- NPM for dependency management

### Key Commands

- **Build**: `npm run build` - Modern esbuild process creating ESM, CJS, and UMD formats
- **Build Legacy**: `npm run build:old` - Legacy Grunt build process for v1.x compatibility
- **Development**: `npm run dev` - Development server with watch mode
- **Test**: `npm run test` - Node.js native test runner
- **Test Watch**: `npm run test:watch` - Tests in watch mode
- **Lint**: `npm run lint` - ESLint validation on src/ and tests/
- **Lint Fix**: `npm run lint-fix` - Auto-fix ESLint issues
- **Format**: `npm run format` - Prettier code formatting
- **Release**: `npm run release` - Automated release process using release-it

### Build Process Details

The `npm run build` command:

1. Uses esbuild to create three output formats from `src/index.js`:
   - `dist/justgage.esm.js` - ES6 module format
   - `dist/justgage.cjs` - CommonJS format
   - `dist/justgage.umd.js` - UMD format for browsers (global JustGage)
2. All builds are optimized and bundled for production with tree-shaking
3. Zero external dependencies (native SVG implementation)
4. TypeScript definitions included via `src/types/index.d.ts`

### esbuild Configuration

- **ESM**: Modern ES6 modules for bundlers and modern browsers
- **CJS**: CommonJS for Node.js environments
- **UMD**: Universal Module Definition for legacy browser support

## Code Standards and Guidelines

### JavaScript Standards

- **ES Version**: ES2021 (ecmaVersion: 12)
- **Linting**: ESLint with Standard config + Prettier
- **Environments**: Browser, CommonJS, AMD support required
- **Style**: Prettier formatting enforced

### Code Quality Requirements

- All code must pass ESLint validation before commits
- Use `npm run lint-fix` to auto-resolve formatting issues
- Maintain browser compatibility (no modern JS features that break older browsers)
- Preserve UMD module pattern for multi-environment support

### API Design Principles

- Maintain backward compatibility - this is a mature library with many users
- Configuration-driven approach with sensible defaults
- Chainable methods where appropriate
- Clear error messages with console.log for debugging

## Key Features to Understand

### Core Functionality

- Gauge creation with customizable appearance
- Value animation with configurable timing and easing
- Multiple gauge types: standard, donut, differential
- Custom sectors with color ranges
- Pointer and target line options
- Responsive sizing options

### Important Configuration Options

- **Required**: `id` or `parentNode`
- **Value Management**: `value`, `min`, `max`, `decimals`
- **Appearance**: `gaugeColor`, `levelColors`, `gaugeWidthScale`
- **Animation**: `startAnimationTime`, `refreshAnimationTime`
- **Advanced**: `customSectors`, `pointerOptions`, `textRenderer`

### Methods

- `refresh(val, max, min, label)` - Update gauge values
- `update(options)` - Update appearance dynamically
- `destroy()` - Clean up gauge instance

## Testing and Validation

### Automated Testing

- **Unit Tests**: Node.js native test runner (`npm run test`)
- **Test Environment**: jsdom for DOM simulation in Node.js
- **Test Files**: Located in `tests/unit/` directory
- **Test Coverage**: Core functionality, SVG rendering, configuration handling
- **Watch Mode**: `npm run test:watch` for development

### Pre-commit Requirements

- ESLint must pass (`npm run lint`) on src/ and tests/
- Prettier formatting enforced (`npm run format:check`)
- Build must complete successfully (`npm run build`)
- All tests must pass (`npm run test`)
- No console errors in example files

### Manual Testing

- Test examples in `docs/examples/` directory (legacy v1.x examples)
- Create modern test files using `dist/justgage.esm.js` imports
- Verify responsive behavior and SVG rendering
- Check animation performance with native SVG
- Validate in multiple browsers for SVG compatibility
- Test both legacy and modern API compatibility

## Documentation Guidelines

### Code Documentation

- Maintain JSDoc comments for public API methods
- Include usage examples for complex features
- Document breaking changes clearly

### README.md Maintenance

- Keep options table up-to-date with all configuration parameters
- Update examples when adding new features
- Maintain accurate installation instructions

### Examples

- Each major feature should have a corresponding example in `docs/examples/`
- Examples should be self-contained HTML files
- Include clear, commented JavaScript demonstrations

## Release Process

### Version Management

- Uses semantic versioning (currently v1.7.0)
- Major version bump from v1.x due to architectural changes
- Automated with release-it tool
- Changelog auto-generated from commits
- Breaking changes from v1.x: ES6+ modules, native SVG (no RaphaelJS)

### Breaking Changes Protocol

- Document all breaking changes in README.md
- Update version appropriately (major for breaking changes)
- Provide migration guidance for users

## Dependencies

### Runtime Dependencies

- **None!** - Zero dependencies, uses native browser SVG APIs

### Development Dependencies

- **esbuild**: Fast bundler for ESM, CJS, and UMD output formats
- **ESLint**: Code quality and style enforcement with Standard config
- **Prettier**: Code formatting integration with ESLint
- **jsdom**: DOM environment for Node.js testing (SVG support)
- **Node.js Test Runner**: Native Node.js testing (no external framework)
- **release-it**: Automated release management with GitHub integration
- **auto-changelog**: Automated changelog generation
- **Grunt**: Legacy build system (maintained for v1.x compatibility)

## Modernization Status (v2.0)

### Current Architecture

- **Core Class**: `src/core/JustGage.js` - Main ES6+ class implementation
- **SVG Renderer**: `src/rendering/svg.js` - Native SVG API wrapper (replaces RaphaelJS)
- **Configuration**: `src/core/config.js` - Centralized config handling with defaults
- **Utilities**: Modular helper functions for colors, formatting, DOM manipulation
- **Zero Dependencies**: No external runtime dependencies (RaphaelJS removed)

### Migration from v1.x

- **Breaking Changes**: ES6+ modules, native SVG rendering, class-based API
- **Compatibility Layer**: Legacy `justgage.js` maintained for gradual migration
- **API Compatibility**: Core API methods preserved for backward compatibility
- **Performance**: Significant improvement due to native SVG vs RaphaelJS

### Known Issues

- Some v1.x examples may need updates for v2.x imports
- Legacy RaphaelJS-based examples in `docs/examples/` need modernization
- Need comprehensive test coverage for all SVG rendering methods

## Important Considerations

### Backward Compatibility

- Library serves both v1.x (RaphaelJS) and v2.x (native SVG) users
- Maintain API compatibility while modernizing implementation
- Test thoroughly with both legacy and modern examples
- Consider deprecation warnings before removing v1.x features

### Performance

- Library is used in dashboards where performance matters
- Minimize DOM manipulations during animations
- Be careful with memory leaks in gauge instances

### Browser Support

- Must work in various browser environments
- Avoid modern JavaScript features without transpilation
- Test SVG rendering across different browsers

## Common Task Guidelines

### Adding New Features (v2.x)

1. Add feature to appropriate module in `src/` directory
2. Update configuration in `src/core/config.js` with sensible defaults
3. Add TypeScript definitions in `src/types/index.d.ts`
4. Write unit tests in `tests/unit/`
5. Update README.md options table
6. Create modern example using ES6 imports
7. Ensure ESLint compliance (`npm run lint`)
8. Test across different gauge configurations
9. Verify build outputs (`npm run build`)

### Bug Fixes (v2.x)

1. Identify root cause in `src/` modules (not legacy `justgage.js`)
2. Create unit test reproducing the issue
3. Fix in appropriate module (core, rendering, utils)
4. Ensure fix works for all build outputs (ESM, CJS, UMD)
5. Test with both modern and legacy examples
6. Run full test suite (`npm run test`)
7. Run build and lint process

### Legacy Support (v1.x)

- For v1.x issues, work with `justgage.js` and RaphaelJS
- Consider if fix should be ported to v2.x architecture
- Maintain compatibility with existing `docs/examples/`

### Documentation Updates

1. Update README.md for API changes
2. Add or update examples as needed
3. Ensure examples work with latest code
4. Update any inline code comments
