# JustGage Development Instructions

## Quick Reference

### Legacy v1.x Reference

**IMPORTANT**: When asked about "old implementation", "previous version", or "legacy behavior", always check `/docs/public/justgage.js` - this is the 1728-line reference implementation that defines expected functionality.

### Project Structure

- `/src/` - Modern TypeScript implementation (v2.0+)
- `/docs/public/justgage.js` - Legacy v1.x reference (check this for old implementation)
- `/docs/` - Vue 3 + Vuetify 3 documentation site
- `/migration-utils/` - Migration tools and utilities
- `/tests/` - Test suites

### Common Tasks

#### Adding New Features

1. Check `/docs/public/justgage.js` for v1.x reference behavior
2. Implement in `/src/` using modern ES6+ patterns
3. Add TypeScript types
4. Update documentation in `/docs/`
5. Add playground example
6. Write tests

#### Bug Fixes

1. Reproduce issue in playground (`/docs/src/views/PlaygroundView.vue`)
2. Check legacy behavior in `/docs/public/justgage.js`
3. Fix in `/src/` while maintaining API compatibility
4. Update tests
5. Verify fix in documentation site

#### Documentation Updates

- **Site**: `/docs/` (Vue 3 + Vuetify 3)
- **Playground**: `/docs/src/views/PlaygroundView.vue`
- **API Docs**: `/docs/src/views/DocsView.vue`
- **Examples**: Include both v1.x and v2.0+ code samples

### Code Patterns

#### Modern Implementation (v2.0+)

```typescript
// Use native SVG APIs
const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

// TypeScript interfaces
interface GaugeConfig {
  id: string;
  value: number;
  min?: number;
  max?: number;
}

// ES6 classes
class JustGage {
  constructor(config: GaugeConfig) {
    // Implementation
  }
}
```

#### Legacy Reference Pattern (v1.x)

```javascript
// RaphaelJS usage (from /docs/public/justgage.js)
obj.canvas = Raphael(obj.node, obj.config.width, obj.config.height);
obj.canvas.circle(cx, cy, radius);
```

### Documentation Site (Vue 3 + Vuetify 3)

#### Key Components

- **App.vue**: Main layout with responsive navigation
- **HomeView.vue**: Landing page
- **PlaygroundView.vue**: Interactive gauge playground
- **DocsView.vue**: API documentation

#### Mobile Responsiveness

- Navigation drawer for mobile devices
- Responsive gauge containers
- Touch-friendly controls

#### Playground Features

- Real-time gauge rendering
- Dual gauge comparison (v1.x vs v2.0+)
- Configuration panels
- Grid overlay system
- Responsive testing controls
- Preset management
- Export/import functionality

### Testing Strategy

- **Unit tests**: Core functionality
- **Integration tests**: Full gauge lifecycle
- **Visual tests**: Rendering accuracy
- **Performance tests**: Animation smoothness
- **Compatibility tests**: API parity with v1.x

### Migration Guidelines

#### From v1.x to v2.0+

```javascript
// v1.x (Legacy)
var gauge = new JustGage({
  id: 'gauge',
  value: 67,
  min: 0,
  max: 100,
});

// v2.0+ (Modern)
import JustGage from 'justgage';
const gauge = new JustGage({
  id: 'gauge',
  value: 67,
  min: 0,
  max: 100,
});
```

#### Breaking Changes

- No RaphaelJS dependency
- ES6 modules instead of UMD
- Native SVG APIs
- TypeScript support
- Improved performance

### Commit Message Format

Use **Conventional Commits**:

```bash
feat(core): add support for custom value formatters
fix(api): resolve gauge refresh animation timing
docs(playground): improve responsive testing controls
refactor(core): migrate pointer rendering to SVG
```

### Performance Considerations

- Use `requestAnimationFrame` for animations
- Debounce resize events
- Minimize DOM queries
- Optimize for multiple gauge instances
- Consider memory cleanup in `destroy()` method

### Browser Compatibility

- Modern: ES6+ features, native SVG
- Legacy: UMD build with polyfills
- Mobile: Touch events, responsive design
- Accessibility: ARIA labels, keyboard navigation
