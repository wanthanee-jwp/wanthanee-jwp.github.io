<script setup lang="ts">
import type { SkillCategory } from '~/types/profile'

defineProps<{
  skill: SkillCategory
}>()
</script>

<template>
  <article class="skill-card">
    <h3 class="skill-card__title">{{ skill.category }}</h3>
    <ul class="skill-list" :aria-label="`${skill.category} skills`">
      <li v-for="item in skill.items" :key="item" class="skill-list__item">{{ item }}</li>
    </ul>
  </article>
</template>
