---
applyTo: "{README.md,docs/**/*.md,docs/**/*.html}"
---

## Documentation Guidelines for JustGage

When working with documentation files, follow these guidelines to maintain consistency and accuracy across all user-facing content.

### README.md Maintenance

1. **Options Table Accuracy**:
   - Keep the options table synchronized with actual code functionality
   - Add new configuration options with accurate descriptions
   - Include default values exactly as they appear in code
   - Maintain consistent formatting and alignment

2. **Version Information**:
   - Update version numbers when making releases
   - Maintain backward compatibility notes
   - Document breaking changes in BREAKING CHANGES section
   - Reference correct version in installation examples

3. **Installation Instructions**:
   - Keep CDN links updated to latest versions
   - Maintain accuracy of NPM and Bower installation commands
   - Include both module and browser global usage examples
   - Verify all external links work correctly

4. **Code Examples**:
   - Ensure all code examples in README work with current version
   - Use realistic, practical examples that demonstrate features clearly
   - Include both basic and advanced usage patterns
   - Test examples before committing changes

### Example Files (`docs/examples/`)

1. **Self-Contained HTML Files**:
   - Each example should be a complete, runnable HTML file
   - Include both RaphaelJS and JustGage library references
   - Use relative paths to library files: `../justgage.js` and `../raphael.min.js`
   - Add clear, descriptive titles and comments

2. **Feature Demonstration**:
   - Each example should focus on a specific feature or use case
   - Include JavaScript comments explaining the configuration
   - Show practical applications of the feature
   - Use realistic data and scenarios

3. **Code Quality in Examples**:
   - Follow JavaScript best practices even in example files
   - Use clear variable names and structure
   - Include error handling where appropriate
   - Demonstrate proper gauge cleanup when needed

4. **Example Naming Conventions**:
   - Use descriptive filenames that indicate the feature: `custom-sectors.html`
   - Keep filenames lowercase with hyphens
   - Group related examples logically
   - Maintain alphabetical ordering when possible

### Documentation Website (`docs/`)

1. **Asset Management**:
   - Keep `docs/justgage.js` and `docs/raphael.min.js` synchronized with source
   - Update documentation files when library changes
   - Maintain image assets in `docs/img/`
   - Optimize images for web delivery

2. **Navigation and Structure**:
   - Maintain logical organization of examples
   - Update navigation when adding new examples
   - Ensure all internal links work correctly
   - Keep styling consistent across pages

### API Documentation

1. **Method Documentation**:
   - Document all public methods with parameter types and descriptions
   - Include return value information
   - Provide usage examples for complex methods
   - Maintain JSDoc comments in source code

2. **Configuration Options**:
   - Document all configuration options with accurate descriptions
   - Include type information (string, number, boolean, object)
   - Specify required vs optional parameters
   - Show example values for complex options like `customSectors`

3. **Browser Compatibility**:
   - Document supported browsers and versions
   - Note any browser-specific considerations
   - Include fallback information where relevant

### Content Guidelines

1. **Writing Style**:
   - Use clear, concise language
   - Write for developers with varying experience levels
   - Include practical examples and use cases
   - Maintain consistent terminology throughout

2. **Technical Accuracy**:
   - Test all code examples before publication
   - Verify configuration options work as documented
   - Keep dependency versions accurate
   - Update links to external resources regularly

3. **Visual Elements**:
   - Include screenshots for visual features when helpful
   - Use consistent image sizes and formatting
   - Optimize images for loading speed
   - Add alt text for accessibility

### Change Management

1. **Documentation Updates with Code Changes**:
   - Update README.md when adding new features
   - Create examples for new functionality
   - Update existing examples if API changes
   - Review all affected documentation files

2. **Version-Specific Documentation**:
   - Maintain changelog with user-facing changes
   - Document migration steps for breaking changes
   - Keep historical examples working when possible
   - Archive outdated documentation appropriately

3. **Cross-Reference Validation**:
   - Ensure all internal links work correctly
   - Verify external links are still active
   - Check that all referenced files exist
   - Validate example file paths and dependencies

### HTML Example Template

When creating new examples, use this structure:
```html
<!DOCTYPE html>
<html>
<head>
    <title>JustGage - [Feature Name]</title>
    <meta charset="utf-8">
</head>
<body>
    <h1>JustGage - [Feature Name]</h1>
    <div id="gauge"></div>
    
    <script src="../raphael.min.js"></script>
    <script src="../justgage.js"></script>
    <script>
        // Clear, commented JavaScript demonstrating the feature
        var gauge = new JustGage({
            id: "gauge",
            // ... configuration options with comments
        });
    </script>
</body>
</html>
```

### Quality Checklist

Before submitting documentation changes:
- [ ] All code examples tested and working
- [ ] Options table updated if new features added
- [ ] Internal links verified
- [ ] Examples are self-contained and runnable
- [ ] Consistent formatting and style maintained
- [ ] No broken external links
- [ ] Screenshots updated if UI changed
- [ ] Version numbers accurate throughout