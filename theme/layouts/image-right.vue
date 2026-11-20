<!--
  Text on the left, image on the right (inside the frame, with caption).
  ---
  layout: image-right
  image: /images/campus.jpg
  caption: Optional caption
  width: 45%            # share of the image column
  fit: contain | cover  # cover fills the column edge to edge
  ---
-->
<script setup lang="ts">
import type { ImageFit } from '../types'
import TumFitFigure from '../components/TumFitFigure.vue'
import TumFrame from '../components/TumFrame.vue'
import { useTum } from '../composables/useTum'

withDefaults(defineProps<{
  image?: string
  caption?: string
  width?: string
  fit?: ImageFit
  alt?: string
  side?: 'left' | 'right'
}>(), {
  width: '45%',
  side: 'right',
})

const { figureNumber } = useTum()
</script>

<template>
  <TumFrame :layout-name="`image-${side}`">
    <div
      class="tum-split"
      :class="`tum-split--${side}`"
      :style="{ gridTemplateColumns: side === 'right' ? `1fr ${width}` : `${width} 1fr` }"
    >
      <div class="tum-split__text">
        <slot />
      </div>
      <TumFitFigure
        class="tum-split__media"
        :src="image"
        :caption="caption"
        :alt="alt"
        :fit="fit"
        :n="figureNumber"
      />
    </div>
  </TumFrame>
</template>
