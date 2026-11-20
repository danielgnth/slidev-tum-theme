<!--
  Closing slide, same composition as the cover. Body defaults to "Questions?".
  ---
  layout: end
  email: jane.doe@example.org
  web: www.cs.cit.tum.de
  tower: true
  ---
-->
<script setup lang="ts">
import TumFrame from '../components/TumFrame.vue'
import TumTower from '../components/TumTower.vue'
import { useTum } from '../composables/useTum'

withDefaults(defineProps<{
  email?: string
  web?: string
  tower?: boolean
}>(), {
  tower: true,
})

const { t, author } = useTum()
</script>

<template>
  <TumFrame layout-name="end" no-footer force-header="full">
    <template #background>
      <TumTower v-if="tower" />
    </template>
    <div class="tum-cover tum-end">
      <slot>
        <h1>{{ t.questions }}</h1>
      </slot>
      <div v-if="email || web" class="tum-end__contact">
        <p class="tum-cover__author">
          {{ author }}
        </p>
        <p v-if="email">
          {{ email }}
        </p>
        <p v-if="web">
          {{ web }}
        </p>
      </div>
    </div>
  </TumFrame>
</template>
