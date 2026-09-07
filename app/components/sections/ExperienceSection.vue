<script setup lang="ts">
import type { Experience } from '~/types/profile'

defineProps<{
  experience: readonly Experience[]
}>()
</script>

<template>
  <section id="experience" class="content-section section-anchor container" aria-labelledby="experience-title">
    <SectionHeading title="Experience" icon="briefcase" heading-id="experience-title" />
    <div class="experience-list">
      <ExperienceItem
        v-for="item in experience"
        :key="`${item.company}-${item.startDate}`"
        :experience="item"
      />
    </div>
  </section>
</template>
