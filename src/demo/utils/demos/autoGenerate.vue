<template>
  <TvBreadcrumb
    auto-generate
    @item-click="onItemClick"
    @navigate="onNavigate"
  />
</template>

<script setup>
import { TvBreadcrumb } from '@todovue/tv-breadcrumb';

// No need to define items when auto-generate is enabled
// Used $route.path to generate breadcrumb items automatically
// Result: "/docs/guides/install" -> Home / Docs / Guides / Install

const onItemClick = ({ item, index, event }) => {
  // logging, analytics, etc.
  console.log('item-click', { item, index, event })
}

const onNavigate = ({ to, item, index }) => {
  // post-navigation logic
  console.log('navigate', { to, item, index })
}
</script>
