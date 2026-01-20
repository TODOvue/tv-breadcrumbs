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
  },
  activeLink: {
    type: Boolean,
    default: false
  }
})

import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['item-click', 'navigate'])

const { itemsToRender, handleClick } = useBreadcrumb(props, emit)

const dropdownOpen = ref(false)

function toggleDropdown(evt) {
  evt.stopPropagation()
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})
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
        <template v-if="item.isEllipsis">
          <span
            class="tv-breadcrumb-link"
            role="button"
            tabindex="0"
            @click="toggleDropdown"
            @keydown.enter.prevent="toggleDropdown"
            @keydown.space.prevent="toggleDropdown"
          >
            <slot name="ellipsis" :item="item">
              {{ item.label }}
            </slot>
          </span>

          <div
            v-if="dropdownOpen"
            class="tv-breadcrumb-dropdown"
            :class="{ 'tv-breadcrumb-dropdown--open': dropdownOpen }"
            @click.stop
          >
            <a
              v-for="(hiddenItem, hIndex) in item.hiddenItems"
              :key="hiddenItem.key || hIndex"
              class="tv-breadcrumb-link"
              :href="hiddenItem.href"
              @click="handleClick($event, hiddenItem, -1)"
            >
              <span v-if="hiddenItem.icon" class="tv-breadcrumb-icon">
                <i :class="hiddenItem.icon" aria-hidden="true"></i>
              </span>
              {{ hiddenItem.label }}
            </a>
          </div>

          <span class="tv-breadcrumb-separator" aria-hidden="true">
            <slot name="separator">
              {{ separator }}
            </slot>
          </span>
        </template>

        <template v-else-if="index !== itemsToRender.length - 1">
          <a
            class="tv-breadcrumb-link"
            :href="item.disabled ? undefined : (item.href || '#')"
            :aria-disabled="item.disabled ? 'true' : undefined"
            :tabindex="item.disabled ? -1 : undefined"
            itemprop="item"
            @click="handleClick($event, item, index)"
          >
            <span v-if="item.icon" class="tv-breadcrumb-icon">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>
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
          <a
            v-if="activeLink"
            class="tv-breadcrumb-current tv-breadcrumb-link"
            :href="item.href || '#'"
            aria-current="page"
            @click="handleClick($event, item, index)"
          >
            <span v-if="item.icon" class="tv-breadcrumb-icon">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>
            <slot name="current" :item="item" :index="index">
              {{ item.label }}
            </slot>
          </a>
          <span
            v-else
            class="tv-breadcrumb-current"
            aria-current="page"
          >
            <span v-if="item.icon" class="tv-breadcrumb-icon">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>
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
