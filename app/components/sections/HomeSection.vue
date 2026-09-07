<script setup lang="ts">
import type { ContactLink, Profile } from '~/types/profile'

defineProps<{
  profile: Profile
  contactLinks: ContactLink[]
}>()
</script>

<template>
  <section id="home" class="hero section-anchor container" aria-labelledby="home-title">
    <div class="hero__grid">
      <div class="hero__identity">
        <p class="eyebrow"><AppIcon name="layers" /> Backend Developer</p>
        <h1 id="home-title">{{ profile.name }}</h1>
        <p class="hero__role">{{ profile.position }} · {{ profile.company }}</p>
        <div class="hero__facts" aria-label="Profile facts">
          <span><AppIcon name="clock" /> {{ profile.experienceYears }}+ years experience</span>
          <span><AppIcon name="pin" /> {{ profile.location }}</span>
        </div>
        <div class="hero__actions">
          <a class="button button--primary" href="#projects">View projects</a>
          <a class="button" href="#contact">Contact me</a>
        </div>
      </div>

      <ul class="contact-list contact-list--hero" aria-label="Contact links">
        <li v-for="link in contactLinks" :key="link.kind">
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            <AppIcon :name="link.kind === 'email' ? 'mail' : 'link'" />
            {{ link.displayValue }}
          </a>
        </li>
      </ul>
    </div>

    <TagList :items="profile.specialization" label="Specializations" variant="outline" />
  </section>
</template>
