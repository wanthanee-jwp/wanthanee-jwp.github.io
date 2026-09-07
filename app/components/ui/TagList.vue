<script setup lang="ts">
withDefaults(defineProps<{
  items: readonly string[]
  label: string
  variant?: 'outline' | 'filled' | 'compact'
}>(), {
  variant: 'filled',
})
</script>

<template>
  <ul class="tag-list" :class="`tag-list--${variant}`" :aria-label="label">
    <li v-for="item in items" :key="item" class="tag-list__item">
      {{ item }}
    </li>
  </ul>
</template>
