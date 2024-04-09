<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'

interface Props {
  modelValue?: string
  disabled?: boolean
  placeholder?: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const modelValue = useVModel(props, 'modelValue', emit)
</script>

<template>
  <input
    v-model="modelValue"
    :class="$style['base-input']"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
  />
</template>

<style lang="scss" module>
@import '@/assets/scss/base/base-input';
</style>
