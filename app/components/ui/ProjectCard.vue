<script setup lang="ts">
import type { Project } from '~/types/profile'

const props = defineProps<{
  project: Project
}>()

const visibleHighlights = computed(() => props.project.highlights.slice(0, 3))
const remainingHighlights = computed(() => props.project.highlights.slice(3))
const githubUrl = computed(() => props.project.github.trim())
const demoUrl = computed(() => props.project.demo.trim())
</script>

<template>
  <article class="project-card">
    <header>
      <p class="project-card__role">{{ project.role }}</p>
      <h3>{{ project.name }}</h3>
      <p class="project-card__description">{{ project.description }}</p>
    </header>

    <ul class="detail-list detail-list--compact">
      <li v-for="highlight in visibleHighlights" :key="highlight">
        {{ highlight }}
      </li>
    </ul>

    <details v-if="remainingHighlights.length" class="project-card__more">
      <summary>+{{ remainingHighlights.length }} more highlights</summary>
      <ul class="detail-list detail-list--compact">
        <li v-for="highlight in remainingHighlights" :key="highlight">
          {{ highlight }}
        </li>
      </ul>
    </details>

    <TagList :items="project.technologies" :label="`${project.name} technologies`" variant="compact" />

    <div v-if="githubUrl || demoUrl" class="project-card__links">
      <a v-if="githubUrl" :href="githubUrl" target="_blank" rel="noopener noreferrer">
        View GitHub
      </a>
      <a v-if="demoUrl" :href="demoUrl" target="_blank" rel="noopener noreferrer">
        View demo
      </a>
    </div>
  </article>
</template>
