<!--
  Beamer-style blocks (block / alertblock / exampleblock, moepdef).
  <Block title="Definition">Text</Block>
  <Block type="alert" title="Caution">…</Block>
  <Block type="example" title="Example" outline>…</Block>
  type: info (default) | alert | example | warning | note
-->
<script setup lang="ts">
import type { BlockType } from '../types'

withDefaults(defineProps<{
  title?: string
  type?: BlockType
  outline?: boolean
}>(), {
  type: 'info',
})
</script>

<template>
  <div class="tum-block" :class="[`tum-block--${type}`, { 'tum-block--outline': outline }]">
    <div v-if="title || $slots.title" class="tum-block__title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div class="tum-block__body">
      <slot />
    </div>
  </div>
</template>
