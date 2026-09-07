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
    <span class="section-heading__icon" aria-hidden="true">
      <AppIcon :name="icon" />
    </span>
    <h2 :id="headingId">{{ title }}</h2>
    <span v-if="count !== undefined" class="section-heading__count">({{ count }})</span>
  </div>
</template>
