<script setup lang="ts">
import type { Project } from '~/types/profile'

defineProps<{
  projects: readonly Project[]
}>()
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <SectionHeading
      title="Projects"
      icon="folder"
      heading-id="projects-title"
      :count="projects.length"
    />
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.name" :project="project" />
    </div>
  </section>
</template>
