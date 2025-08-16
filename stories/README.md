# Component Library Storybook Documentation

This directory contains comprehensive Storybook documentation for our React component library.

## Components Documented

### InputField
- **File**: `InputField.stories.tsx`
- **Features**: Variants, sizes, validation states, interactive features
- **Stories**: 8 stories covering all use cases
- **Documentation**: Complete API reference, accessibility notes, best practices

### DataTable
- **File**: `DataTable.stories.tsx`
- **Features**: Sorting, search, pagination, selection, custom rendering
- **Stories**: 8 stories including real-world examples
- **Documentation**: Performance notes, column configuration, accessibility

## Running Storybook

\`\`\`bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook
\`\`\`

## Documentation Standards

Each component story includes:

1. **Component Description**: Overview and key features
2. **API Documentation**: Props, types, and configuration options
3. **Anatomy**: Component structure and composition
4. **Accessibility**: ARIA support, keyboard navigation, screen reader compatibility
5. **Best Practices**: Do's and don'ts for proper usage
6. **Real-world Examples**: Practical implementation scenarios
7. **Interactive Stories**: Live examples with controls

## Deployment

Stories are configured for deployment to:
- **Chromatic**: Automated visual testing and review
- **Vercel**: Static hosting for documentation site
- **GitHub Pages**: Alternative hosting option

## Contributing

When adding new components:

1. Create a `.stories.tsx` file following the existing pattern
2. Include comprehensive documentation in the meta description
3. Add multiple stories covering different use cases
4. Include accessibility and best practices sections
5. Add real-world examples demonstrating practical usage
