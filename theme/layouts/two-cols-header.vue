<script setup lang="ts">
import TwoCols from './two-cols.vue'
</script>

<template>
  <TwoCols v-bind="$attrs">
    <template #default>
      <slot />
    </template>
    <template #left>
      <slot name="left" />
    </template>
    <template #right>
      <slot name="right" />
    </template>
    <template v-if="$slots.bottom" #bottom>
      <slot name="bottom" />
    </template>
  </TwoCols>
</template>
