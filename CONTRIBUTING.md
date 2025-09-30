# Contributing to JustGage

Thank you for your interest in contributing to JustGage! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Legacy Reference](#legacy-reference)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/justgage.git
cd justgage
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up documentation site**

```bash
cd docs
npm install
npm run dev
```

4. **Run tests**

```bash
npm test
```

5. **Build the project**

```bash
npm run build
```

## Project Structure

```
justgage/
├── src/                 # Modern v2.0+ TypeScript implementation
├── docs/                # Legacy documentation
│   └── public/
│       └── justgage.js  # v1.x reference implementation (1728 lines)
├── docs/            # Vue 3 + Vuetify 3 documentation site
│   ├── src/
│   │   ├── views/
│   │   │   ├── HomeView.vue        # Landing page
│   │   │   ├── PlaygroundView.vue  # Interactive playground
│   │   │   └── DocsView.vue        # API documentation
│   │   └── App.vue      # Main layout
├── migration-utils/     # Migration tools and utilities
├── tests/              # Test suites
├── dist/               # Built distribution files
└── .github/            # GitHub workflows and templates
```

## Code Standards

### Conventional Commits

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

#### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `chore`: Other changes

#### Scopes

- `core`: Core gauge functionality
- `api`: Public API changes
- `docs`: Documentation site
- `migration`: Migration utilities
- `playground`: Interactive playground
- `build`: Build configuration
- `types`: TypeScript definitions

#### Examples

```bash
git commit -m "feat(core): add custom sector support for value ranges"
git commit -m "fix(api): resolve animation callback timing issues"
git commit -m "docs(playground): add responsive gauge size example"
```

### Code Style

- **ESLint**: Follow the configuration in `eslint.config.js`
- **Prettier**: Use `.prettierrc` for code formatting
- **TypeScript**: Write type-safe code with strict checking
- **Comments**: Use JSDoc for public APIs

### TypeScript Guidelines

```typescript
// Define clear interfaces
interface GaugeConfig {
  id: string;
  value: number;
  min?: number;
  max?: number;
  // ... other options
}

// Use proper access modifiers
class JustGage {
  private canvas: SVGElement;
  public config: GaugeConfig;

  constructor(config: GaugeConfig) {
    this.validateConfig(config);
    // ...
  }

  /**
   * Updates the gauge value with animation
   * @param value - New value to display
   * @param animate - Whether to animate the change
   */
  public refresh(value: number, animate: boolean = true): void {
    // Implementation
  }
}
```

## Legacy Reference

### Important: v1.x Reference Implementation

When working on features or bug fixes, **always check** `/docs/public/justgage.js` for the legacy v1.x implementation. This 1728-line file is the definitive reference for:

- Expected behavior and API compatibility
- Feature specifications
- Default values and configurations
- Animation patterns
- Event handling

### Migration Considerations

- Maintain API compatibility where possible
- Document breaking changes clearly
- Provide migration guides
- Update `/migration-utils/` with helpful tools

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write unit tests for all new features
- Include integration tests for complex functionality
- Test edge cases and error conditions
- Verify backward compatibility with v1.x API

```typescript
// Example test
describe('JustGage', () => {
  it('should create gauge with default configuration', () => {
    const gauge = new JustGage({ id: 'test-gauge', value: 50 });
    expect(gauge.config.min).toBe(0);
    expect(gauge.config.max).toBe(100);
  });
});
```

## Documentation

### Documentation Site (Vue 3 + Vuetify 3)

The documentation site is located in `/docs/` and includes:

- **Interactive Playground**: Real-time gauge configuration and testing
- **API Documentation**: Complete reference with examples
- **Migration Guide**: Help users transition from v1.x to v2.0+
- **Mobile-Responsive Design**: Navigation drawers and responsive layouts

### Updating Documentation

1. **API Changes**: Update `/docs/src/views/DocsView.vue`
2. **New Features**: Add examples to `/docs/src/views/PlaygroundView.vue`
3. **Migration Notes**: Update migration sections
4. **Code Examples**: Include both v1.x and v2.0+ examples

### Documentation Standards

- Provide clear, working examples
- Include TypeScript definitions
- Show migration paths from v1.x
- Test all code examples
- Use proper formatting with syntax highlighting

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**

```bash
git checkout -b feat/your-feature-name
```

2. **Make your changes**
   - Follow code standards
   - Write tests
   - Update documentation
   - Check legacy compatibility

3. **Test thoroughly**

```bash
npm test
npm run build
cd docs && npm run build
```

4. **Commit with conventional format**

```bash
git commit -m "feat(core): add your feature description"
```

5. **Push and create PR**

```bash
git push origin feat/your-feature-name
```

### PR Requirements

- [ ] Tests pass
- [ ] Code follows style guidelines
- [ ] Commit messages follow conventional format
- [ ] Documentation updated
- [ ] Legacy compatibility considered
- [ ] No breaking changes (or clearly documented)
- [ ] Performance impact assessed

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Legacy compatibility verified

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## Performance Guidelines

- Use `requestAnimationFrame` for smooth animations
- Minimize DOM manipulations during updates
- Debounce frequent events (resize, scroll)
- Profile memory usage with multiple gauges
- Optimize for mobile devices

## Browser Support

- **Modern**: ES6+ features, native SVG APIs
- **Legacy**: UMD build with appropriate polyfills
- **Mobile**: Touch-friendly interactions
- **Accessibility**: WCAG 2.1 AA compliance

## Getting Help

- Check existing [issues](https://github.com/toorshia/justgage/issues)
- Review [discussions](https://github.com/toorshia/justgage/discussions)
- Reference legacy implementation in `/docs/public/justgage.js`
- Check the interactive playground for examples

## License

By contributing to JustGage, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to JustGage! 🎯
