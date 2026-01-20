<template>
  <TvBreadcrumbs
    :items="items"
    @item-click="onItemClick"
    @navigate="onNavigate"
  />
</template>

<script setup>
import { TvBreadcrumbs } from '@todovue/tv-breadcrumbs';

// Example assumes you have an icon library like FontAwesome loaded
// or defined CSS classes for these icons.
const items = [
  { label: 'Home', href: '/', icon: 'fa-solid fa-house' },
  { label: 'Settings', href: '/settings', icon: 'fa-solid fa-gear' },
  { label: 'Profile', icon: 'fa-solid fa-user' }
];

const onItemClick = ({ item, index, event }) => {
  console.log('item-click', { item, index, event })
}

const onNavigate = ({ to, item, index }) => {
  console.log('navigate', { to, item, index })
}
</script>
