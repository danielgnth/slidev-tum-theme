<!--
  Figure caption in the tumbeamer style: blue "Figure N:" label followed by the text.
  <Caption n="2">Network topology</Caption>
  <Caption>Unnumbered caption</Caption>
  <Caption label="Table" n="1">Results</Caption>
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useTum } from '../composables/useTum'

const props = defineProps<{
  n?: number | string
  label?: string
}>()

const { t } = useTum()
const prefix = computed(() => {
  if (props.n == null || props.n === '' || props.n === 0) {
    return props.label
      ? `${props.label}:`
      : ''
  }
  return `${props.label ?? t.value.figure} ${props.n}:`
})
</script>

<template>
  <figcaption class="tum-caption">
    <span v-if="prefix" class="tum-caption__label">{{ prefix }}</span>
    <slot />
  </figcaption>
</template>
