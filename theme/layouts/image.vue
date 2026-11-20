<!--
  Titled figure slide: heading + one image scaled to the free space + caption.
  ---
  layout: image
  image: /images/topology.svg
  caption: Network topology        # numbered automatically ("Figure 2: …")
  fit: contain                     # contain (default) | cover
  ---
  # Title
  Optional short text above the image.
-->
<script setup lang="ts">
import type { ImageFit } from '../types'
import TumFitFigure from '../components/TumFitFigure.vue'
import TumFrame from '../components/TumFrame.vue'
import { useTum } from '../composables/useTum'

defineProps<{
  image?: string
  caption?: string
  fit?: ImageFit
  alt?: string
}>()

const { figureNumber } = useTum()
</script>

<template>
  <TumFrame layout-name="image">
    <div class="tum-stack">
      <div class="tum-stack__head">
        <slot />
      </div>
      <TumFitFigure
        class="tum-stack__fill"
        :src="image"
        :caption="caption"
        :alt="alt"
        :fit="fit"
        :n="figureNumber"
      />
    </div>
  </TumFrame>
</template>
