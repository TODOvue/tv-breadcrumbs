<template>
  <TvBreadcrumbs
    :items="items"
    active-link
    @item-click="onItemClick"
    @navigate="onNavigate"
  />
</template>

<script setup>
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Post-123', href: '/blog/post-123' } // Renders as link due to active-link
];

const onItemClick = ({ item, index, event }) => {
  console.log('item-click', { item, index, event })
}

const onNavigate = ({ to, item, index }) => {
  console.log('navigate', { to, item, index })
}
</script>
