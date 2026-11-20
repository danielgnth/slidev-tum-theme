<!--
  Three columns with a header.
  # Title
  ::left::   …
  ::middle:: …
  ::right::  …
  ::bottom:: optional
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'

withDefaults(defineProps<{
  cols?: string
  gap?: string
  align?: 'start' | 'center' | 'end'
}>(), {
  cols: '1fr 1fr 1fr',
  gap: '1.5rem',
  align: 'start',
})
</script>

<template>
  <TumFrame layout-name="three-cols">
    <div class="tum-cols">
      <div class="tum-cols__header">
        <slot />
      </div>
      <div class="tum-cols__grid" :style="{ gridTemplateColumns: cols, columnGap: gap, alignItems: align }">
        <div class="tum-cols__col">
          <slot name="left" />
        </div>
        <div class="tum-cols__col">
          <slot name="middle" />
        </div>
        <div class="tum-cols__col">
          <slot name="right" />
        </div>
      </div>
      <div v-if="$slots.bottom" class="tum-cols__bottom">
        <slot name="bottom" />
      </div>
    </div>
  </TumFrame>
</template>
