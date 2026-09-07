<script setup lang="ts">
import type { AppIconName } from '~/types/ui'

defineProps<{
  name: AppIconName
}>()
</script>

<template>
  <svg
    class="app-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'mail'">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </template>
    <template v-else-if="name === 'github'">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20z" />
      <path d="M2 12h20" />
    </template>
    <template v-else-if="name === 'gitlab'">
      <path d="M18 8h4l-2 12-8 8-8-8-2-12h4" />
      <path d="M6 8l6 6 6-6" />
    </template>
    <template v-else-if="name === 'code'">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </template>
    <template v-else-if="name === 'briefcase'">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </template>
    <template v-else-if="name === 'folder'">
      <path d="M4 5a2 2 0 0 1 2-2h3.5l2 2.5H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5z" />
    </template>
    <template v-else-if="name === 'activity'">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </template>
  </svg>
</template>
