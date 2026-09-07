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
    <AppHeader :name="profile.profile.name" />
    <main id="main-content">
      <HomeSection :profile="profile.profile" :contact-links="contactLinks" />
      <AboutSection :summary="profile.summary" :specialization="profile.profile.specialization" />
      <SkillsSection :skills="profile.skills" />
      <ExperienceSection :experience="profile.experience" />
      <ProjectsSection :projects="profile.projects" />
      <ContactSection :links="contactLinks" />
    </main>
    <AppFooter
      :name="profile.profile.name"
      :position="profile.profile.position"
      :location="profile.profile.location"
    />
  </div>
</template>
