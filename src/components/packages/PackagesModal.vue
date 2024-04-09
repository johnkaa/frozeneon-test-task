<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'
import BaseModal from '@/components/base/BaseModal.vue'
import type IPackage from '@/pkg/interfaces/package'
import getPackageType from '@/pkg/plugins/get-package-type'

type TagKeyType = 'alpha' | 'beta' | 'latest' | 'lts' | 'next'

interface IProps {
  modalActive: boolean
  detailedData: IPackage | null
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'update:modalActive', value: string): void
}>()

const modalActive = useVModel(props, 'modalActive', emit)

const tagsKeys = computed<TagKeyType[]>(() => {
  if (props.detailedData?.tags && Object.keys(props.detailedData.tags).length) {
    return Object.keys(props.detailedData.tags) as TagKeyType[]
  }
  return []
})
</script>

<template>
  <BaseModal v-model:modal-active="modalActive">
    <h2 :class="$style['packages-modal__title']">{{ props.detailedData?.name }}</h2>
    <div class="packages-modal__type" v-if="props.detailedData">
      <span class="packages-modal__type-title">Type: </span>
      <span class="packages-modal__type-text">{{ getPackageType(props.detailedData) }}</span>
    </div>

    <div :class="$style['packages-modal__list']" v-if="tagsKeys.length">
      <div :class="$style['packages-modal__list-title']">Tags:</div>
      <div :class="$style['packages-modal__list-items']">
        <div v-for="tag in tagsKeys" :key="tag" :class="$style['packages-modal__item']">
          {{ props.detailedData?.tags?.[tag] }}
        </div>
      </div>
    </div>

    <div :class="$style['packages-modal__list']" v-if="props.detailedData?.versions?.length">
      <div :class="$style['packages-modal__list-title']">Versions:</div>
      <div :class="$style['packages-modal__list-items']">
        <div
          v-for="version in props.detailedData?.versions"
          :key="version.version"
          :class="$style['packages-modal__item']"
        >
          {{ version.version }}
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" module>
@import '@/assets/scss/packages/packages-modal';
</style>
