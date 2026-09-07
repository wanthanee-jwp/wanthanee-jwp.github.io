<script setup lang="ts">
defineProps<{
  name: string
}>()

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const
</script>

<template>
  <header class="site-header">
    <nav class="container site-nav" aria-label="Primary navigation">
      <a class="site-nav__brand" href="#home" :aria-label="`${name}, back to home`">WP</a>
      <ul class="site-nav__links">
        <li v-for="item in navigation" :key="item.href">
          <a :href="item.href">{{ item.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>
