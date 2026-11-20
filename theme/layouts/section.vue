<!--
  Section divider. The first heading is the section title, further text is a subtitle.
    number: false     hide the automatic section number
    variant: blue     blue background with white text
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
import { useTum } from '../composables/useTum'

withDefaults(defineProps<{
  number?: boolean | number | string
  variant?: 'light' | 'blue'
}>(), {
  number: true,
  variant: 'light',
})

const { sectionNumber } = useTum()
</script>

<template>
  <TumFrame layout-name="section" :inverted="variant === 'blue'" :class="`tum-section--${variant}`">
    <div class="tum-section">
      <div v-if="number !== false" class="tum-section__number">
        {{ typeof number === 'boolean' ? String(sectionNumber).padStart(2, '0') : number }}
      </div>
      <div class="tum-section__content">
        <slot />
      </div>
    </div>
  </TumFrame>
</template>
