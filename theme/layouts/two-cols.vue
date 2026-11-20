<!--
  Two columns. With ::left:: the default slot becomes the header spanning both columns,
  without it the default slot is the left column (Slidev's built-in behaviour).

  ---
  layout: two-cols
  cols: 2fr 1fr        # optional, any grid-template-columns value
  ---
  # Title
  ::left::
  Left
  ::right::
  Right
  ::bottom::
  Spans both columns at the bottom
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'

withDefaults(defineProps<{
  cols?: string
  gap?: string
  align?: 'start' | 'center' | 'end'
}>(), {
  cols: '1fr 1fr',
  gap: '2rem',
  align: 'start',
})
</script>

<template>
  <TumFrame layout-name="two-cols">
    <div class="tum-cols">
      <div v-if="$slots.left" class="tum-cols__header">
        <slot />
      </div>
      <div class="tum-cols__grid" :style="{ gridTemplateColumns: cols, columnGap: gap, alignItems: align }">
        <div class="tum-cols__col">
          <slot v-if="$slots.left" name="left" />
          <slot v-else />
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
