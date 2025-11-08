<script setup>
import { defineAsyncComponent } from 'vue'
import { TvDemo } from '@todovue/tv-demo'
import { demos } from "./utils/mocks.js"

const TvBreadcrumbs = defineAsyncComponent(/* webpackChunkName: "TvBreadcrumbs" */() => import('../components/TvBreadcrumbs.vue'))

</script>

<template>
  <tv-demo
    :component="TvBreadcrumbs"
    :variants="demos"
    nameComponent="TvBreadcrumbs"
    npmInstall="@todovue/tv-breadcrumbs"
    sourceLink="https://github.com/TODOvue/tv-breadcrumbs"
    urlClone="https://github.com/TODOvue/tv-breadcrumbs.git"
    version="1.0.0"
  ></tv-demo>
</template>

<style scoped>

</style>
