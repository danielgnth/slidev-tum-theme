<!--
  Diagram slide: heading + a Mermaid / PlantUML / SVG diagram that is scaled to fill
  the remaining space, + optional caption.
  ---
  layout: diagram
  caption: System architecture
  ---
  # Title
  ```mermaid
  flowchart LR
    A --> B
  ```
-->
<script setup lang="ts">
import { ref } from 'vue'
import Caption from '../components/Caption.vue'
import TumFrame from '../components/TumFrame.vue'
import { useFitMermaid } from '../composables/useFitMermaid'
import { useTum } from '../composables/useTum'

defineProps<{
  caption?: string
}>()

const { figureNumber } = useTum()

const root = ref<HTMLElement>()
useFitMermaid(root)
</script>

<template>
  <TumFrame layout-name="diagram">
    <figure ref="root" class="tum-stack tum-diagram">
      <slot />
      <Caption v-if="caption" :n="figureNumber">
        {{ caption }}
      </Caption>
    </figure>
  </TumFrame>
</template>
