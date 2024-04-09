<script setup lang="ts">
import { defineProps } from 'vue'
interface Props {
  disabled?: boolean
  rounded?: boolean
}
const props = defineProps<Props>()
</script>

<template>
  <button
    :class="{
      [$style['base-button']]: true,
      [$style['base-button_rounded']]: props.rounded
    }"
    :disabled="props.disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
@import '@/assets/scss/base/base-button';
</style>
