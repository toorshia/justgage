---
applyTo: "*.js"
---

## JavaScript Development Guidelines for JustGage

When working with JavaScript files in this repository, follow these specific guidelines to maintain code quality and consistency.

### Code Style and Standards

1. **ESLint Configuration**: This project uses ESLint with Standard config and Prettier
   - Always run `npm run lint` before committing
   - Use `npm run lint-fix` to auto-fix formatting issues
   - All code must pass ESLint validation

2. **ES2021 Features**: Code targets ES2021 (ecmaVersion: 12)
   - Use modern JavaScript features but maintain browser compatibility
   - Avoid features that break older browser support
   - No transpilation is used, so be conservative with newer features

3. **Module Pattern**: Maintain UMD (Universal Module Definition) pattern
   - Support AMD, CommonJS, and browser globals
   - The main library uses this pattern in `justgage.js`
   - Preserve compatibility across all environments

### Code Organization

1. **Main Library Structure**:
   - Single file architecture in `justgage.js` (1700+ lines)
   - Constructor function pattern with prototype methods
   - Configuration-driven API design
   - All functionality encapsulated in JustGage constructor

2. **Function Organization**:
   - Public API methods: `refresh()`, `update()`, `destroy()`
   - Private helper functions for internal calculations
   - Event handling methods
   - Animation and rendering functions

3. **Error Handling**:
   - Use `console.log()` for user-facing debugging messages
   - Validate required parameters (id or parentNode)
   - Graceful fallbacks for missing configurations
   - Return `false` for constructor failures

### API Design Principles

1. **Backward Compatibility**:
   - NEVER break existing API without major version bump  
   - Maintain support for all documented configuration options
   - Add new features as optional parameters with sensible defaults
   - Consider deprecation warnings before removing features

2. **Configuration Options**:
   - Add new options to the main config object
   - Provide sensible defaults for all new options
   - Document all options in README.md options table
   - Use `isUndefined()` helper for parameter checking

3. **Method Signatures**:
   - Keep method signatures simple and intuitive
   - Support both single parameters and options objects where appropriate
   - Maintain chainable methods where it makes sense

### Performance Considerations

1. **Animation Performance**:
   - Minimize DOM manipulations during animations
   - Use RaphaelJS efficiently for SVG rendering
   - Avoid memory leaks in gauge instances
   - Cache calculations where possible

2. **Initialization**:
   - Validate DOM elements early in constructor
   - Set up gauge elements efficiently
   - Handle responsive sizing properly

### RaphaelJS Integration

1. **Vector Graphics**:
   - All rendering uses RaphaelJS for SVG creation
   - Gauge elements are vector-based for scalability
   - Handle cross-browser SVG compatibility through RaphaelJS

2. **Animation System**:
   - Use RaphaelJS animation capabilities
   - Support different easing types (linear, >, <, <>, bounce)
   - Configurable animation timing

### Testing Guidelines

1. **Example Files**:
   - Test changes with existing examples in `docs/examples/`
   - Ensure no console errors in browser
   - Verify animations work smoothly
   - Check responsive behavior

2. **Browser Compatibility**:
   - Test in multiple browsers for major changes
   - Verify SVG rendering works correctly
   - Check that UMD loading works in different environments

### Common Patterns

1. **Helper Functions**:
   ```javascript
   function isUndefined(variable) {
     return typeof variable === 'undefined';
   }
   ```

2. **Configuration Merging**:
   - Use defaults object when provided
   - Merge dataset attributes from HTML
   - Override with explicit config parameters

3. **DOM Element Handling**:
   - Check for element existence before manipulation
   - Handle both id and parentNode parameters
   - Validate container elements early

### Debugging Support

1. **Console Messages**:
   - Provide helpful error messages for common mistakes
   - Include element ids in error messages
   - Use descriptive prefixes like "* justgage:"

2. **Development Mode**:
   - Console statements are removed in production build
   - Add debugging information for development
   - Support configuration validation

### File Modifications

When modifying `justgage.js`:
1. Maintain the existing code structure
2. Add new features near related functionality
3. Update JSDoc comments for public methods
4. Test with multiple gauge configurations
5. Ensure build process completes successfully