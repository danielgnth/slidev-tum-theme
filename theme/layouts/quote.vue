<!--
  Big quote.
  ---
  layout: quote
  source: Donald E. Knuth
  ---
  Premature optimization is the root of all evil.
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'

defineProps<{
  source?: string
}>()
</script>

<template>
  <TumFrame layout-name="quote">
    <div class="tum-centered tum-quote">
      <div class="tum-quote__mark">
        “
      </div>
      <div class="tum-quote__text">
        <slot />
      </div>
      <div v-if="source" class="tum-quote__source">
        — {{ source }}
      </div>
    </div>
  </TumFrame>
</template>
