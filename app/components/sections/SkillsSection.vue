<script setup lang="ts">
import type { SkillCategory } from '~/types/profile'

defineProps<{
  skills: readonly SkillCategory[]
}>()
</script>

<template>
  <section id="skills" class="content-section section-anchor container" aria-labelledby="skills-title">
    <SectionHeading title="Skills" icon="code" heading-id="skills-title" />
    <div class="skills-grid">
      <SkillGroup v-for="skill in skills" :key="skill.category" :skill="skill" />
    </div>
  </section>
</template>
