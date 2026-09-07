<script setup lang="ts">
import type { Experience } from '~/types/profile'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <article class="experience-item">
    <header class="experience-item__summary">
      <h3>{{ experience.position }}</h3>
      <p>{{ experience.company }}</p>
      <p class="experience-item__date">
        {{ experience.startDate }} — {{ experience.endDate }}
      </p>
    </header>
    <ul class="detail-list">
      <li v-for="responsibility in experience.responsibilities" :key="responsibility">
        {{ responsibility }}
      </li>
    </ul>
  </article>
</template>
