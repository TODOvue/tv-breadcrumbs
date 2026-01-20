<script setup>
import { defineAsyncComponent } from 'vue'
import { demos } from "./utils/mocks.js"

const TvBreadcrumbs = defineAsyncComponent(/* webpackChunkName: "TvBreadcrumbs" */() => import('../components/TvBreadcrumbs.vue'))
</script>

<template>
  <TvDemo
    :component="TvBreadcrumbs"
    :variants="demos"
    :manual-emits="['item-click', 'navigate']"
    hide-background
    component-name="TvBreadcrumbs"
    npm-install="@todovue/tv-breadcrumbs"
    source-link="https://github.com/TODOvue/tv-breadcrumbs"
    url-clone="https://github.com/TODOvue/tv-breadcrumbs.git"
    version="1.1.3"
  />
</template>
