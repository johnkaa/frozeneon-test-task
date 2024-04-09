<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { useVModel } from '@vueuse/core'
import BaseButton from '@/components/base/BaseButton.vue'
interface IProps {
  modalActive: boolean
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'update:modalActive', value: string): void
}>()

const modalActive = useVModel(props, 'modalActive', emit)

const modalInner = ref()

function closeModal(event: MouseEvent | null) {
  if (event) {
    const target = event.target as Element
    if (target.closest(`.${modalInner.value.classList[0]}`)) return
  }

  modalActive.value = false
}
</script>

<template>
  <transition name="modal-animation">
    <div v-show="props.modalActive" :class="$style['base-modal']" @mouseup="closeModal">
      <transition name="modal-animation-inner">
        <div v-show="props.modalActive" :class="$style['base-modal__inner']" ref="modalInner">
          <BaseButton :class="$style['base-modal__close']" rounded @click="closeModal(null)">
            X
          </BaseButton>

          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" module>
@import '@/assets/scss/base/base-modal';
</style>

<style lang="scss" scoped>
@import '@/assets/scss/base/base-modal-animation';
</style>
