<script setup lang="ts">
import type { Experience } from '~/types/profile'

defineProps<{
  experience: Experience
}>()
</script>

<template>
  <article class="experience-card">
    <header>
      <h3 class="experience-card__title">{{ experience.position }}</h3>
      <p class="experience-card__company">{{ experience.company }}</p>
      <span class="experience-card__date">
        {{ experience.startDate }} — {{ experience.endDate }}
      </span>
    </header>
    <ul class="experience-card__list">
      <li v-for="responsibility in experience.responsibilities" :key="responsibility">
        {{ responsibility }}
      </li>
    </ul>
  </article>
</template>
