<!--
  TUM logo, traced from \TUMLogo in tumlogo.sty.
  The logo is a TUM trademark and not covered by the MIT licence (see NOTICE.md).
  <TumLogo />                    blue, 28px high
  <TumLogo color="white" :height="60" />
-->
<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
  height?: number | string
}>(), {
  color: 'var(--tum-blue)',
  height: 28,
})
</script>

<template>
  <svg
    class="tum-logo"
    viewBox="0 0 1897 1000"
    :style="{ height: typeof height === 'number' ? `${height}px` : height, color }"
    role="img"
    aria-label="TUM"
  >
    <path
      fill="currentColor"
      d="M179 179V1000H359V179H564V1000H1128V179H1333V1000H1513V179H1718V1000H1897V0H949V821H744V0H0V179Z"
    />
  </svg>
</template>

<style scoped>
.tum-logo {
  width: auto;
  display: block;
  flex: none;
}
</style>
