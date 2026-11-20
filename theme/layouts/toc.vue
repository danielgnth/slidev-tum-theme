<!--
  Agenda built from all `layout: section` slides.
    heading: "Outline"         (default depends on lang)
    highlight: current | next  emphasise one section and grey out the others
                               (use it for recurring agenda slides)
    columns: 2
    numbered: true             show 01, 02, … instead of bullets
  Any markdown in the slide body replaces the generated title.
-->
<script setup lang="ts">
import { computed } from 'vue'
import TumFrame from '../components/TumFrame.vue'
import { useTum } from '../composables/useTum'
import { highlightedSection, listSections } from '../utils/slides'

const props = withDefaults(defineProps<{
  heading?: string
  highlight?: 'current' | 'next' | 'none'
  columns?: number
  numbered?: boolean
}>(), {
  highlight: 'none',
  columns: 1,
})

const { slides, t, page, slidev } = useTum()

const sections = computed(() => listSections(slides.value, i => `${t.value.section} ${i}`))
const activeNo = computed(() => highlightedSection(sections.value, page.value, props.highlight))

function go(no: number) {
  slidev.nav.go(no)
}
</script>

<template>
  <TumFrame layout-name="toc">
    <slot>
      <h1>{{ heading ?? t.contents }}</h1>
    </slot>
    <ul class="tum-toc" :class="{ 'tum-toc--numbered': numbered }" :style="{ columns }">
      <li
        v-for="s in sections"
        :key="s.no"
        :class="{ 'is-active': activeNo === s.no, 'is-muted': activeNo != null && activeNo !== s.no }"
        @click="go(s.no)"
      >
        <span v-if="numbered" class="tum-toc__no">{{ String(s.index).padStart(2, '0') }}</span>
        <span class="tum-toc__title">{{ s.title }}</span>
      </li>
    </ul>
  </TumFrame>
</template>
