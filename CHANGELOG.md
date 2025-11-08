# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-08

### ✨ Added
- Initial release of TvBreadcrumbs component
- Manual breadcrumb items via `items` prop
- Auto-generation mode from Vue Router routes (`autoGenerate` prop)
- Custom separator support via `separator` prop (default: `›`)
- Max items control with ellipsis collapse (`maxItems` prop)
- Customizable home label for auto-generated breadcrumbs (`homeLabel` prop)
- ARIA accessibility label customization (`ariaLabel` prop)
- `item-click` event emitted when breadcrumb item is clicked
- `navigate` event emitted when router navigation occurs
- Three customizable slots:
  - `item` - Customize breadcrumb link rendering
  - `current` - Customize current (last) item rendering
  - `separator` - Customize separator rendering
- Full Vue Router integration with automatic detection
- Route meta breadcrumb support (string, array, or function)
- Disabled item state support
- Full ARIA accessibility support:
  - Semantic HTML structure (`<nav>`, `<ol>`, `<li>`)
  - `aria-current="page"` for current item
  - `aria-disabled` for disabled items
  - `aria-hidden` for separators
- Schema.org structured data markup for SEO
- SSR-ready implementation (works with Nuxt 3)
- BEM-style CSS classes for easy customization
- Keyboard navigation support
- Responsive SCSS styling
- TypeScript definitions
- Plugin installation support
- Composable architecture with `useBreadcrumb`
- Auto-normalization of breadcrumb items
- Path segment humanization (converts kebab-case to Title Case)

[1.0.0]: https://github.com/TODOvue/tv-breadcrumbs/pull/1/files
