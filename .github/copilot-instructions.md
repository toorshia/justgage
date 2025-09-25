# JustGage - GitHub Copilot Instructions

This is a JavaScript library for creating animated dashboard gauges using RaphaelJS. JustGage provides a clean, simple API for generating SVG-based gauges that are resolution independent and self-adjusting.

## Project Overview

JustGage is a popular gauge visualization library with the following characteristics:
- **Main Technology**: Vanilla JavaScript with RaphaelJS dependency
- **Module System**: Supports AMD, CommonJS, and browser globals (UMD pattern)
- **Build System**: Grunt-based build process
- **Testing**: ESLint for code quality
- **Distribution**: Available via NPM, Bower, and CDN

## Repository Structure

- `justgage.js` - Main library source file (1700+ lines)
- `index.js` - NPM entry point
- `raphael.min.js` - Required RaphaelJS dependency
- `docs/` - Documentation website and examples
- `docs/examples/` - HTML examples demonstrating various features
- `dist/` - Built/minified files for distribution

## Build and Development Workflow

### Prerequisites
- Node.js 18.x (as specified in GitHub Actions)
- NPM for dependency management

### Key Commands
- **Build**: `npm run build` - Runs Grunt build process, copies files to docs/ and dist/
- **Lint**: `npm run lint` - ESLint validation
- **Lint Fix**: `npm run lint-fix` - Auto-fix ESLint issues
- **Release**: `npm run release` - Automated release process using release-it

### Build Process Details
The `npm run build` command:
1. Runs `grunt build` which copies and minifies `justgage.js`
2. Copies built files to `docs/` directory for website
3. Stages changes in git for commit

### Grunt Build Tasks
- **copy**: Copies `justgage.js` to `dist/`
- **uglify**: Minifies JavaScript with source maps, removes console statements

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

### Pre-commit Requirements
- ESLint must pass (`npm run lint`)
- Build must complete successfully (`npm run build`)
- No console errors in example files

### Manual Testing
- Test examples in `docs/examples/` directory
- Verify responsive behavior
- Check animation performance
- Validate in multiple browsers if making core changes

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
- Automated with release-it tool
- Changelog auto-generated from commits

### Breaking Changes Protocol
- Document all breaking changes in README.md
- Update version appropriately (major for breaking changes)
- Provide migration guidance for users

## Dependencies

### Runtime Dependencies
- **RaphaelJS** (v2.3.0): Vector graphics library, must be loaded before JustGage

### Development Dependencies
- **Grunt**: Build automation
- **ESLint**: Code quality and style enforcement
- **Prettier**: Code formatting
- **release-it**: Automated release management

## Important Considerations

### Backward Compatibility
- This library has many existing users - avoid breaking changes
- Test thoroughly with existing examples before major modifications
- Consider deprecation warnings before removing features

### Performance
- Library is used in dashboards where performance matters
- Minimize DOM manipulations during animations
- Be careful with memory leaks in gauge instances

### Browser Support
- Must work in various browser environments
- Avoid modern JavaScript features without transpilation
- Test SVG rendering across different browsers

## Common Task Guidelines

### Adding New Features
1. Add configuration option with sensible default
2. Update README.md options table
3. Create example in `docs/examples/`
4. Ensure ESLint compliance
5. Test across different gauge configurations

### Bug Fixes
1. Identify root cause in `justgage.js`
2. Create minimal reproduction case
3. Fix without breaking existing functionality
4. Test with existing examples
5. Run full build and lint process

### Documentation Updates
1. Update README.md for API changes
2. Add or update examples as needed
3. Ensure examples work with latest code
4. Update any inline code comments