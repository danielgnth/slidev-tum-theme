<!--
  Full-bleed photo with a white logo, optional title/text overlay and caption.
  ---
  layout: image-full
  image: /images/campus.jpg
  caption: Photo credit / caption
  dim: true            # darken the photo so overlaid text stays readable
  position: center     # background-position
  ---
  # Optional overlay title
-->
<script setup lang="ts">
import { resolveAssetUrl } from '@slidev/client'
import { computed } from 'vue'
import TumLogo from '../components/TumLogo.vue'

const props = withDefaults(defineProps<{
  image?: string
  caption?: string
  dim?: boolean
  position?: string
  logo?: boolean
}>(), {
  dim: false,
  position: 'center',
  logo: true,
})

const style = computed(() => ({
  backgroundImage: props.image
    ? `${props.dim ? 'linear-gradient(rgba(0,0,0,.25), rgba(0,0,0,.55)), ' : ''}url("${resolveAssetUrl(props.image)}")`
    : undefined,
  backgroundPosition: props.position,
}))
</script>

<template>
  <div class="slidev-layout tum-layout-image-full" :style="style">
    <TumLogo v-if="logo" class="tum-image-full__logo" color="white" height="var(--tum-logo-h)" />
    <div class="tum-image-full__content">
      <slot />
    </div>
    <div v-if="caption" class="tum-image-full__caption">
      {{ caption }}
    </div>
  </div>
</template>
