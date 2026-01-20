<p align="center"><img width="150" src="https://res.cloudinary.com/dcdfhi8qz/image/upload/v1763663056/uqqtkgp1lg3xdplutpga.png" alt="TODOvue logo">
</p>

# TODOvue Breadcrumbs (TvBreadcrumbs)
A flexible, framework‑agnostic Vue 3 breadcrumb navigation component with auto-generation from routes, custom separators, max items control, and full customization. Works seamlessly in Single Page Apps or Server-Side Rendered (SSR) environments (e.g. Nuxt 3).

[![npm](https://img.shields.io/npm/v/@todovue/tv-breadcrumbs.svg)](https://www.npmjs.com/package/@todovue/tv-breadcrumbs)
[![npm downloads](https://img.shields.io/npm/dm/@todovue/tv-breadcrumbs.svg)](https://www.npmjs.com/package/@todovue/tv-breadcrumbs)
[![npm total downloads](https://img.shields.io/npm/dt/@todovue/tv-breadcrumbs.svg)](https://www.npmjs.com/package/@todovue/tv-breadcrumbs)
![License](https://img.shields.io/github/license/TODOvue/tv-breadcrumbs)
![Release Date](https://img.shields.io/github/release-date/TODOvue/tv-breadcrumbs)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/@todovue/tv-breadcrumbs)
![Node Version](https://img.shields.io/node/v/@todovue/tv-breadcrumbs)
![Last Commit](https://img.shields.io/github/last-commit/TODOvue/tv-breadcrumbs)
![Stars](https://img.shields.io/github/stars/TODOvue/tv-breadcrumbs?style=social)

> Demo: https://ui.todovue.blog/breadcrumbs

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Quick Start (SPA)](#quick-start-spa)
- [Nuxt 4 / SSR Usage](#nuxt-4--ssr-usage)
- [Component Registration Options](#component-registration-options)
- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Auto-Generate Mode](#auto-generate-mode)
- [Max Items & Ellipsis](#max-items--ellipsis)
- [Router Integration](#router-integration)
- [Customization (Styles / Theming)](#customization-styles--theming)
- [Accessibility](#accessibility)
- [SSR Notes](#ssr-notes)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Manual items**: Provide a static array of breadcrumb items
- **Auto-generation**: Automatically generate breadcrumbs from Vue Router routes
- **Max items control**: Collapse long breadcrumb trails with ellipsis (`…`)
- **Custom separators**: Choose your own separator character or component
- **Customizable slots**: Override item, current item, and separator rendering
- **Router integration**: Automatically integrates with Vue Router for navigation
- **Accessibility**: Full ARIA support with semantic HTML and structured data
- **SSR-ready**: Works in both SPA and SSR (Nuxt 3) contexts
- **Lightweight**: Tree-shakeable with Vue marked external in library build

## Installation
Using npm:
```bash
npm install @todovue/tv-breadcrumbs
```
Using yarn:
```bash
yarn add @todovue/tv-breadcrumbs
```
Using pnpm:
```bash
pnpm add @todovue/tv-breadcrumbs
```

## Quick Start (SPA)
Global registration (main.js / main.ts):
```js
import { createApp } from 'vue'
import App from './App.vue'
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs'
import '@todovue/tv-breadcrumbs/style.css' // import styles

createApp(App)
  .use(TvBreadcrumbs) // enables <TvBreadcrumbs /> globally
  .mount('#app')
```
Local import inside a component:
```vue
<script setup>
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Category', href: '/products/category' },
  { label: 'Item Details' }
]

function onItemClick({ item, index, event }) {
  console.log('Clicked:', item.label)
}
</script>

<template>
  <TvBreadcrumbs :items="items" @item-click="onItemClick" />
</template>
```

## Nuxt 4 / SSR Usage
First, add the stylesheet to your Nuxt config:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@todovue/tv-breadcrumbs/nuxt'
  ]
})
```

Then create a plugin file: `plugins/tv-breadcrumbs.client.ts` (or without `.client` suffix as it's SSR-safe):
```ts
import { defineNuxtPlugin } from '#app'
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(TvBreadcrumbs)
})
```
Use anywhere:
```vue
<TvBreadcrumbs auto-generate />
```
Optional direct import (no plugin):
```vue
<script setup>
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs'
</script>
```

## Component Registration Options
| Approach                                                                        | When to use                                    |
|---------------------------------------------------------------------------------|------------------------------------------------|
| Global via `app.use(TvBreadcrumbs)`                                             | Many usages across app / design system install |
| Local named import `{ TvBreadcrumbs }`                                          | Isolated / code-split contexts                 |
| Direct default import `import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs'` | Single usage or manual registration            |

## Props
| Prop         | Type    | Default        | Description                                                                                      |
|--------------|---------|----------------|--------------------------------------------------------------------------------------------------|
| items        | Array   | `[]`           | Array of breadcrumb items. Each item: `{ label, href?, disabled?, key? }`.                       |
| separator    | String  | `'›'`          | Character or string to display between breadcrumb items.                                         |
| maxItems     | Number  | `0`            | Maximum items to display. If exceeded, shows first item + ellipsis + last N items. 0 = no limit. |
| autoGenerate | Boolean | `false`        | Auto-generate breadcrumbs from `$route.path` or route meta (`breadcrumb`).                       |
| homeLabel    | String  | `'Home'`       | Label for the home item when auto-generating breadcrumbs.                                        |
| activeLink   | Boolean | `false`        | If `true`, the current page item (last item) is rendered as a link.                              |
| ariaLabel    | String  | `'Breadcrumb'` | ARIA label for the `<nav>` element.                                                              |

### Item Object Structure
Each item in the `items` array can have:
```typescript
{
  label: string       // Display text (required)
  href?: string       // Link URL (optional, null for current page)
  icon?: string       // Icon CSS class (e.g. "fa-solid fa-home") (optional)
  disabled?: boolean  // Disable interaction (optional)
  key?: string        // Unique key for rendering (optional, auto-generated if not provided)
}
```

## Events
| Event name (kebab) | Payload                  | Description                                                           |
|--------------------|--------------------------|-----------------------------------------------------------------------|
| `item-click`       | `{ item, index, event }` | Emitted when any breadcrumb item is clicked.                          |
| `navigate`         | `{ to, item, index }`    | Emitted when navigation occurs via Vue Router (if router is present). |

Usage:
```vue
<TvBreadcrumbs 
  :items="items" 
  @item-click="handleClick"
  @navigate="handleNavigate"
/>
```

```js
function handleClick({ item, index, event }) {
  console.log('Clicked item:', item.label, 'at index:', index)
}

function handleNavigate({ to, item, index }) {
  console.log('Navigating to:', to)
}
```

## Slots
The component provides three slots for full customization:

### `item` slot
Customize the rendering of each breadcrumb link (except the last one).
```vue
<TvBreadcrumbs :items="items">
  <template #item="{ item, index }">
    <strong>{{ item.label }}</strong>
  </template>
</TvBreadcrumbs>
```

### `current` slot
Customize the rendering of the current (last) breadcrumb item.
```vue
<TvBreadcrumbs :items="items">
  <template #current="{ item, index }">
    <em>{{ item.label }}</em>
  </template>
</TvBreadcrumbs>
```

### `separator` slot
Customize the separator between breadcrumb items.
```vue
<TvBreadcrumbs :items="items">
  <template #separator>
    <span> / </span>
  </template>
</TvBreadcrumbs>
```

## Auto-Generate Mode
When `autoGenerate` is enabled, the component automatically creates breadcrumbs from your current route.

### Basic Auto-Generation
```vue
<TvBreadcrumbs auto-generate />
```
This reads `$route.path` and creates breadcrumb items. For example:
- Path: `/docs/guides/installation`
- Result: `Home › Docs › Guides › Installation`

### Custom Home Label
```vue
<TvBreadcrumbs auto-generate home-label="Dashboard" />
```

### Route Meta Integration
You can define breadcrumbs in your route configuration:
```js
const routes = [
  {
    path: '/products',
    meta: {
      breadcrumb: 'Products'
    }
  },
  {
    path: '/products/:id',
    meta: {
      breadcrumb: (route) => [
        { label: 'Products', href: '/products' },
        { label: route.params.id }
      ]
    }
  }
]
```

The component will use:
1. Route meta `breadcrumb` if defined (string, array, or function)
2. Fallback to auto-generated path segments if no meta found

## Max Items & Ellipsis
Control long breadcrumb trails with the `maxItems` prop:

```vue
<TvBreadcrumbs :items="longItemsList" :max-items="4" />
```

**Example:**
- Original: `Home › Docs › API › v1 › Auth › Scopes`
- With `max-items="4"`: `Home › … › Auth › Scopes`

The algorithm keeps:
- First item (always visible)
- Ellipsis (`…`) which is interactive: **click to show hidden items in a dropdown**
- Last N-1 items (where N = maxItems)

## Router Integration
TvBreadcrumbs automatically detects and integrates with Vue Router:

1. **Automatic navigation**: Clicks on breadcrumb links call `router.push()` instead of native navigation
2. **Route reading**: Accesses `$route` for auto-generation
3. **Navigate event**: Emits when programmatic navigation occurs

**Without router**: Links work as standard `<a>` tags with `href`.

**With router**: Navigation is handled programmatically, and the `navigate` event fires.

## Customization (Styles / Theming)
The component uses scoped styles with BEM-like class names for easy customization:

### CSS Classes
- `.tv-breadcrumb-root`: Main `<nav>` container
- `.tv-breadcrumb-list`: `<ol>` list wrapper
- `.tv-breadcrumb-item`: Each `<li>` item
  - `.tv-breadcrumb-item--link`: Non-current items
  - `.tv-breadcrumb-item--current`: Current (last) item
  - `.tv-breadcrumb-item--disabled`: Disabled items
- `.tv-breadcrumb-link`: `<a>` link element
- `.tv-breadcrumb-current`: Current item `<span>`
- `.tv-breadcrumb-separator`: Separator `<span>`

### Custom Styling Example
```css
/* Override default styles */
.tv-breadcrumb-list {
  font-size: 14px;
  color: #333;
}

.tv-breadcrumb-link {
  color: #0066cc;
  text-decoration: none;
}

.tv-breadcrumb-link:hover {
  text-decoration: underline;
}

.tv-breadcrumb-separator {
  margin: 0 8px;
  color: #999;
}

.tv-breadcrumb-current {
  font-weight: 600;
  color: #000;
}
```

## Accessibility
TvBreadcrumbs follows WAI-ARIA best practices:

- **Semantic HTML**: Uses `<nav>`, `<ol>`, `<li>` for proper structure
- **ARIA attributes**: 
  - `aria-label` on `<nav>` (customizable via prop)
  - `aria-current="page"` on the current item
  - `aria-disabled` on disabled items
  - `aria-hidden` on separator
- **Structured data**: Implements Schema.org `ListItem` markup for search engines
- **Keyboard navigation**: All interactive elements are focusable and keyboard-accessible
- **Screen reader friendly**: Proper semantic structure and ARIA labels

## SSR Notes
- No direct DOM (`window` / `document`) access → safe for SSR
- Router access is wrapped with safe guards (checks for `$route` / `$router` existence)
- Works with Nuxt 3 out of the box
- Styles are automatically injected when importing the component
- Auto-generation mode gracefully handles missing router in SSR context

## Development
```bash
git clone https://github.com/TODOvue/tv-breadcrumbs.git
cd tv-breadcrumbs
npm install
npm run dev     # run demo playground
npm run build   # build library
```
Local demo served from Vite using `index.html` + `src/demo` examples.

## Contributing
PRs and issues welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License
MIT © TODOvue

### Attributions
Crafted for the TODOvue component ecosystem
