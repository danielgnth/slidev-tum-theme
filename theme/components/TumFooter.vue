<!--
  Footer in the TUM corporate design: "author | title | date" bottom left, slide number bottom right.
-->
<script setup lang="ts">
import { useTum } from '../composables/useTum'

defineProps<{
  inverted?: boolean
}>()

const { footerText, page } = useTum()
</script>

<template>
  <footer class="tum-footer" :class="{ 'tum-footer--inverted': inverted }">
    <span class="tum-footer__text" v-html="footerText" />
    <span class="tum-footer__page">{{ page }}</span>
  </footer>
</template>
