<template>
  <TvBreadcrumbs
    :items="items"
    separator="→"
    @item-click="onItemClick"
    @navigate="onNavigate"
  />
</template>

<script setup>
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs';
import '@todovue/tv-breadcrumbs/style.css';

const items =[
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs' },
  { label: 'API', href: '/docs/api' },
  { label: 'v1', href: '/docs/api/v1' },
  { label: 'Auth', href: '/docs/api/v1/auth' },
  { label: 'Scopes' }
];

const onItemClick = ({ item, index, event }) => {
  // logging, analytics, etc.
  console.log('item-click', { item, index, event })
}

const onNavigate = ({ to, item, index }) => {
  // post-navigation logic
  console.log('navigate', { to, item, index })
}
</script>
