<!--
  Title slide in the TUM corporate design: chair / school / university and logo at
  the top, left-aligned title block, Uhrenturm on the right.
  Reads `title` and `author` from the headmatter plus these optional fields:
    subtitle:   "Pre-meeting"
    thesisType: intermediate | final
    thesis:     bachelor | master | idp | gr | seminar
    advisor:    "Jane Doe, M.Sc."
    supervisor: "Prof. Dr. …"
    date:       2026-07-02 → "July 2nd, 2026" (default: today), or any text
    venue:      "Garching b. München"
    tower:      false to hide the Uhrenturm
  Any markdown in the slide body is rendered below the author.
-->
<script setup lang="ts">
import { computed } from 'vue'
import TumFrame from '../components/TumFrame.vue'
import TumTower from '../components/TumTower.vue'
import { useTum } from '../composables/useTum'
import { thesisLine as formatThesisLine } from '../utils/i18n'

const props = withDefaults(defineProps<{
  subtitle?: string
  thesisType?: string
  thesis?: string
  advisor?: string
  supervisor?: string
  date?: string | number | Date
  venue?: string
  tower?: boolean
}>(), {
  tower: true,
})

const { title, author, t, lang, org, formatDate, frontmatter } = useTum()

const slideTitle = computed(() => frontmatter.title ?? title.value)

const thesisLine = computed(() => formatThesisLine(lang.value, props.thesisType, props.thesis))
</script>

<template>
  <TumFrame layout-name="cover" no-footer force-header="full">
    <template #background>
      <TumTower v-if="tower" />
    </template>
    <div class="tum-cover">
      <!-- grows upwards: a subtitle moves the title up, not the rest down -->
      <div class="tum-cover__head">
        <h1 class="tum-cover__title">
          {{ slideTitle }}
        </h1>
        <p v-if="subtitle" class="tum-cover__subtitle">
          {{ subtitle }}
        </p>
        <p v-if="thesisLine" class="tum-cover__thesis">
          {{ thesisLine }}
        </p>
      </div>

      <!-- fixed distance from the bottom edge -->
      <div class="tum-cover__foot">
        <p class="tum-cover__author">
          {{ author }}
        </p>
        <p v-if="advisor" class="tum-cover__advisor">
          {{ t.advisedBy }} {{ advisor }}
        </p>
        <p v-if="supervisor" class="tum-cover__advisor">
          {{ supervisor }}
        </p>
        <div v-if="$slots.default" class="tum-cover__extra">
          <slot />
        </div>

        <div class="tum-cover__org">
          <p v-if="org.chair || org.department">
            {{ org.chair || org.department }}
          </p>
          <p>{{ org.school }}</p>
          <p>{{ org.university }}</p>
        </div>

        <p class="tum-cover__date" v-html="formatDate(date)" />
        <p v-if="venue" class="tum-cover__venue">
          {{ venue }}
        </p>
      </div>
    </div>
  </TumFrame>
</template>
