<script setup lang="ts">
import type { SkillCategory } from '~/types/profile'

defineProps<{
  skill: SkillCategory
}>()
</script>

<template>
  <article class="skill-group">
    <h3>{{ skill.category }}</h3>
    <TagList :items="skill.items" :label="`${skill.category} skills`" />
  </article>
</template>
