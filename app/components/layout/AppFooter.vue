<script setup lang="ts">
defineProps<{
  name: string
  position: string
  location: string
}>()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer container">
    <p>© {{ currentYear }} {{ name }}</p>
    <p>{{ position }} · {{ location }}</p>
    <a href="#home">Back to top ↑</a>
  </footer>
</template>
