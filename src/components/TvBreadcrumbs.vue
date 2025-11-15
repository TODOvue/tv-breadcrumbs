<script setup>
import { useBreadcrumb } from '../composables/useBreadcrumb.js'

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  separator: {
    type: String,
    default: '›'
  },
  maxItems: {
    type: Number,
    default: 0
  },
  autoGenerate: {
    type: Boolean,
    default: false
  },
  homeLabel: {
    type: String,
    default: 'Home'
  },
  ariaLabel: {
    type: String,
    default: 'Breadcrumb'
  }
})

const emit = defineEmits(['item-click', 'navigate'])

const { itemsToRender, handleClick } = useBreadcrumb(props, emit)
</script>

<template>
  <nav
    class="tv-breadcrumb tv-breadcrumb-root tv-breadcrumb-container"
    :aria-label="ariaLabel"
  >
    <ol class="tv-breadcrumb-list" role="list">
      <li
        v-for="(item, index) in itemsToRender"
        :key="item.key || index"
        class="tv-breadcrumb-item"
        :class="{
          'tv-breadcrumb-item--current': index === itemsToRender.length - 1,
          'tv-breadcrumb-item--link': index !== itemsToRender.length - 1,
          'tv-breadcrumb-item--disabled': item.disabled
        }"
        :itemscope="index === itemsToRender.length - 1 ? undefined : true"
        :itemtype="index === itemsToRender.length - 1 ? undefined : 'https://schema.org/ListItem'"
      >
        <template v-if="index !== itemsToRender.length - 1">
          <a
            class="tv-breadcrumb-link"
            :href="item.disabled ? undefined : (item.href || '#')"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :tabindex="item.disabled ? -1 : undefined"
            itemprop="item"
            @click="handleClick($event, item, index)"
          >
            <span itemprop="name">
              <slot name="item" :item="item" :index="index">
                {{ item.label }}
              </slot>
            </span>
          </a>
          <meta itemprop="position" :content="String(index + 1)" />

          <span class="tv-breadcrumb-separator" aria-hidden="true">
            <slot name="separator">
              {{ separator }}
            </slot>
          </span>
        </template>

        <template v-else>
          <span
            class="tv-breadcrumb-current"
            aria-current="page"
          >
            <slot name="current" :item="item" :index="index">
              {{ item.label }}
            </slot>
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<style></style>
