<script setup lang="ts">
import type { ContactLink } from '~/types/profile'

defineProps<{
  links: readonly ContactLink[]
}>()
</script>

<template>
  <section id="contact" class="content-section section-anchor container contact-section" aria-labelledby="contact-title">
    <SectionHeading title="Contact" icon="mail" heading-id="contact-title" />
    <div>
      <p class="contact-section__intro">Have a project or opportunity to discuss? Get in touch.</p>
      <ul class="contact-list" aria-label="Contact links">
        <li v-for="link in links" :key="link.kind">
          <span>{{ link.label }}</span>
          <a
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.displayValue }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
