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
    <template v-if="name === 'layers'">
      <path d="m12 2-10 5 10 5 10-5-10-5Z" />
      <path d="m2 12 10 5 10-5M2 17l10 5 10-5" />
    </template>
    <template v-else-if="name === 'summary'">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </template>
    <template v-else-if="name === 'code'">
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </template>
    <template v-else-if="name === 'briefcase'">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </template>
    <template v-else-if="name === 'folder'">
      <path d="M4 5a2 2 0 0 1 2-2h3.5l2 2.5H18a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </template>
    <template v-else>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </template>
  </svg>
</template>
