<!--
  Shared chrome of all content layouts: header, body area and footer.
  Frontmatter on any slide:
    header: compact | full | false   (overrides themeConfig.header)
    footer: false                    (hide footer on this slide)
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useTum } from '../composables/useTum'
import TumFooter from './TumFooter.vue'
import TumHeader from './TumHeader.vue'

const props = defineProps<{
  layoutName?: string
  inverted?: boolean
  noFooter?: boolean
  /** force a header mode, e.g. the cover always shows the full header */
  forceHeader?: 'full' | 'compact' | 'none'
}>()

const { theme, frontmatter } = useTum()

const headerMode = computed(() => {
  if (props.forceHeader)
    return props.forceHeader
  const h = frontmatter.header ?? theme.value.header ?? 'compact'
  return h === false || h === 'none'
    ? 'none'
    : h === 'full'
      ? 'full'
      : 'compact'
})

const showFooter = computed(() =>
  !props.noFooter && frontmatter.footer !== false && theme.value.footer !== false,
)
</script>

<template>
  <div
    class="slidev-layout tum-frame"
    :class="[
      layoutName && `tum-layout-${layoutName}`,
      `tum-frame--header-${headerMode}`,
      { 'tum-frame--inverted': inverted, 'tum-frame--no-footer': !showFooter },
    ]"
  >
    <slot name="background" />
    <TumHeader v-if="headerMode !== 'none'" :mode="headerMode" :inverted="inverted" />
    <div class="tum-body">
      <slot />
    </div>
    <TumFooter v-if="showFooter" :inverted="inverted" />
  </div>
</template>
