<script setup lang="ts">
import { createContactLinks } from '~/utils/contact-links'

const { profile } = useProfile()
const config = useRuntimeConfig()

const contactLinks = computed(() => createContactLinks(profile.contact))
const title = `${profile.profile.name} | ${profile.profile.position}`
const description = profile.summary.length > 160
  ? `${profile.summary.slice(0, 157).trimEnd()}...`
  : profile.summary
const siteUrl = config.public.siteUrl.trim().replace(/\/$/, '')
const sameAs = contactLinks.value.filter(link => link.external).map(link => link.href)

const initials = profile.profile.name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(word => word[0]?.toUpperCase() ?? '')
  .join('')
const projectCount = profile.projects.length
const totalSkills = profile.skills.reduce((sum, cat) => sum + cat.items.length, 0)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'profile',
  ogUrl: siteUrl || undefined,
  twitterCard: 'summary',
  twitterTitle: title,
  twitterDescription: description,
})

useHead({
  link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: profile.profile.name,
        jobTitle: profile.profile.position,
        worksFor: {
          '@type': 'Organization',
          name: profile.profile.company,
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: profile.profile.location,
        },
        email: profile.contact.email,
        sameAs,
        url: siteUrl || undefined,
      }),
    },
  ],
})
</script>

<template>
  <div class="page-shell">
    <main id="main-content" class="container">
      <HomeSection
        :profile="profile.profile"
        :contact-links="contactLinks"
        :initials="initials"
        :project-count="projectCount"
        :total-skills="totalSkills"
      />
      <AboutSection :summary="profile.summary" />
      <SkillsSection :skills="profile.skills" />
      <ExperienceSection :experience="profile.experience" />
      <ProjectsSection :projects="profile.projects" />
      <AppFooter
        :name="profile.profile.name"
        :position="profile.profile.position"
        :location="profile.profile.location"
      />
    </main>
  </div>
</template>
