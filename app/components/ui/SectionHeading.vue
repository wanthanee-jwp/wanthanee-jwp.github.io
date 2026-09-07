<script setup lang="ts">
import type { AppIconName } from '~/types/ui'

defineProps<{
  title: string
  icon: AppIconName
  headingId: string
  count?: number
}>()
</script>

<template>
  <div class="section-heading">
    <AppIcon :name="icon" />
    <h2 :id="headingId">{{ title }}<template v-if="count !== undefined"> ({{ count }})</template></h2>
  </div>
</template>
