<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { usePackagesStore } from '@/stores/packages'

const packagesStore = usePackagesStore()

const searchValue = ref('')

let typingTime: ReturnType<typeof setTimeout> | null = null

function searchPackages(isReady?: boolean) {
  if (isReady) {
    packagesStore.searchPackages(searchValue.value)
  } else {
    if (typingTime) {
      clearTimeout(typingTime)
    }

    typingTime = setTimeout(() => {
      searchPackages(true)
    }, 300)
  }
}

watch(searchValue, () => searchPackages())
</script>

<template>
  <header :class="$style.header">
    <a :class="$style.header__logo" href="/">
      <img
        src="https://static.tildacdn.one/tild6461-6333-4033-a538-303264643862/logo.svg"
        width="157"
        alt="frozeneon"
      />
    </a>
    <BaseInput v-model:model-value="searchValue" placeholder="Search" />
  </header>
</template>

<style lang="scss" module>
@import '@/assets/scss/general/the-header';
</style>
