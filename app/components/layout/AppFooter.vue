<script setup lang="ts">
defineProps<{
  name: string
  position: string
  location: string
}>()
</script>

<template>
  <footer class="site-footer">
    <p>{{ name }}</p>
    <p>{{ position }} · {{ location }}</p>
  </footer>
</template>
