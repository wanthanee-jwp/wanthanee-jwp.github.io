<script setup lang="ts">
import type { ContactLink, Profile } from '~/types/profile'
import type { AppIconName } from '~/types/ui'

defineProps<{
  profile: Profile
  contactLinks: readonly ContactLink[]
  initials: string
  projectCount: number
  totalSkills: number
}>()

const contactIcon: Record<ContactLink['kind'], AppIconName> = {
  email: 'mail',
  github: 'github',
  gitlab: 'gitlab',
}
</script>

<template>
  <section id="home" aria-labelledby="home-title">
    <header class="hero">
      <div class="hero__top">
        <div class="hero__identity">
          <div class="hero__avatar" aria-hidden="true">{{ initials }}</div>
          <div>
            <p class="hero__eyebrow">Backend Developer</p>
            <h1 id="home-title" class="hero__name">{{ profile.name }}</h1>
            <p class="hero__role">{{ profile.position }} · {{ profile.company }}</p>
            <ul class="chip-list" aria-label="Specializations">
              <li v-for="spec in profile.specialization" :key="spec" class="chip-list__item">
                {{ spec }}
              </li>
            </ul>
          </div>
        </div>

        <ul class="hero__contact" aria-label="Contact links">
          <li v-for="link in contactLinks" :key="link.kind">
            <a
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :class="{ 'hero__contact--accent': link.external }"
            >
              <AppIcon :name="contactIcon[link.kind]" />
              <span>{{ link.displayValue }}</span>
            </a>
          </li>
        </ul>
      </div>

      <dl class="hero__stats">
        <div>
          <dt class="hero__stat-label">Years experience</dt>
          <dd class="hero__stat-num">{{ profile.experienceYears }}+</dd>
        </div>
        <div>
          <dt class="hero__stat-label">Projects shipped</dt>
          <dd class="hero__stat-num">{{ projectCount }}</dd>
        </div>
        <div>
          <dt class="hero__stat-label">Technologies</dt>
          <dd class="hero__stat-num">{{ totalSkills }}+</dd>
        </div>
        <div>
          <dt class="hero__stat-label">Based in</dt>
          <dd class="hero__stat-num">{{ profile.location }}</dd>
        </div>
      </dl>
    </header>
  </section>
</template>

<style scoped>
.hero__stats > div {
  display: flex;
  flex-direction: column-reverse;
}
</style>
