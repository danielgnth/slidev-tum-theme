<!--
  Frame headline: chair / school / university text on the left, logo on the right
  (\TUMheader in tumcontact.sty). In `compact` mode only the logo is shown and the
  frame title moves into the header row.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useTum } from '../composables/useTum'
import TumLogo from './TumLogo.vue'

defineProps<{
  mode?: 'full' | 'compact'
  inverted?: boolean
}>()

const { org } = useTum()
const lines = computed(() => [org.value.chair || org.value.department, org.value.school, org.value.university].filter(Boolean))
</script>

<template>
  <header class="tum-header" :class="[`tum-header--${mode ?? 'full'}`, { 'tum-header--inverted': inverted }]">
    <div v-if="mode !== 'compact'" class="tum-header__text">
      <span v-for="line in lines" :key="line">{{ line }}</span>
    </div>
    <TumLogo class="tum-header__logo" :color="inverted ? 'white' : undefined" height="var(--tum-logo-h)" />
  </header>
</template>
