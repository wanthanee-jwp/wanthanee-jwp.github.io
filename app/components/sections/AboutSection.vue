<script setup lang="ts">
defineProps<{
  summary: string
  specialization: readonly string[]
}>()
</script>

<template>
  <section id="about" class="content-section section-anchor container" aria-labelledby="about-title">
    <SectionHeading title="About" icon="summary" heading-id="about-title" />
    <p class="about-copy">{{ summary }}</p>
    <div class="about-specialization">
      <h3>Specialization</h3>
      <TagList :items="specialization" label="Specializations" variant="outline" />
    </div>
  </section>
</template>
