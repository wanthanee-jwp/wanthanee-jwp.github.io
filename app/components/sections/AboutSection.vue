<script setup lang="ts">
defineProps<{
  summary: string
}>()
</script>

<template>
  <section id="about" class="section section--summary" aria-label="About">
    <p class="summary-copy">{{ summary }}</p>
  </section>
</template>
