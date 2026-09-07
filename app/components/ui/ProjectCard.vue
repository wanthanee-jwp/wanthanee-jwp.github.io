<script setup lang="ts">
import type { Project } from '~/types/profile'

const props = defineProps<{
  project: Project
}>()

const HIGHLIGHT_LIMIT = 3
const expanded = ref(false)

const visibleHighlights = computed(() =>
  expanded.value ? props.project.highlights : props.project.highlights.slice(0, HIGHLIGHT_LIMIT),
)
const remainingCount = computed(() =>
  Math.max(0, props.project.highlights.length - HIGHLIGHT_LIMIT),
)
const toggleLabel = computed(() =>
  expanded.value ? 'show less' : `+${remainingCount.value} more`,
)

const githubUrl = computed(() => props.project.github.trim())
const demoUrl = computed(() => props.project.demo.trim())
</script>

<template>
  <article class="project-card">
    <div>
      <p class="project-card__role">{{ project.role }}</p>
      <h3 class="project-card__name">{{ project.name }}</h3>
      <p class="project-card__description">{{ project.description }}</p>
    </div>

    <ul class="project-card__highlights">
      <li v-for="highlight in visibleHighlights" :key="highlight">{{ highlight }}</li>
    </ul>

    <button
      v-if="remainingCount > 0"
      type="button"
      class="project-card__toggle"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      {{ toggleLabel }}
    </button>

    <ul class="project-card__tech" :aria-label="`${project.name} technologies`">
      <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
    </ul>

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
