<script setup lang="ts">
import { ref, defineProps, computed, onMounted, onBeforeUnmount } from 'vue'
import { useVModel } from '@vueuse/core'
import BaseButton from '@/components/base/BaseButton.vue'

interface IProps {
  currentPage: number
  totalPages: number
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()

const currentPage = useVModel(props, 'currentPage', emit)
const initialPagesPerView = ref(7)
const pagesPerView = ref(0)
const isLoaded = ref(false)
let resizeCallback = () => {}

const pagesShift = computed(getPageShift)
const visiblePages = computed(getVisiblePages)
const leftArrowDisabled = computed(() => currentPage.value <= 1)
const rightArrowDisabled = computed(() => currentPage.value >= props.totalPages)
const canDisplayFirstPage = computed(() => {
  return props.totalPages > pagesPerView.value && pagesShift.value.start > 1
})
const canDisplayLastPage = computed(() => {
  return props.totalPages >= pagesPerView.value && pagesShift.value.end < props.totalPages
})
const canDisplayLeftDots = computed(() => {
  return props.totalPages > pagesPerView.value && pagesShift.value.start > 1
})
const canDisplayRightDots = computed(() => {
  return props.totalPages > pagesPerView.value && pagesShift.value.end < props.totalPages
})

function getVisiblePages() {
  const output = []
  for (let i = pagesShift.value.start; i <= pagesShift.value.end; i++) {
    output.push(i)
  }

  return output
}

function getPageShift() {
  const shift = Math.floor(pagesPerView.value / 2)
  let start: number
  let end: number

  if (props.totalPages <= pagesPerView.value + 4) {
    start = 1
    end = props.totalPages
  } else if (currentPage.value <= props.totalPages - currentPage.value) {
    let additionalShift = -1
    if (currentPage.value - pagesPerView.value <= 1) {
      start = 1
      additionalShift = 1
    } else {
      start = currentPage.value - shift >= 1 ? currentPage.value - shift : 1
    }

    const startWithShift = start + pagesPerView.value + additionalShift
    const isStartWithShiftValid = startWithShift <= props.totalPages
    end = isStartWithShiftValid ? startWithShift : props.totalPages
  } else {
    let additionalShift = 1
    if (currentPage.value + pagesPerView.value >= props.totalPages) {
      end = props.totalPages
      additionalShift = -1
    } else {
      end =
        currentPage.value + shift <= props.totalPages ? currentPage.value + shift : props.totalPages
    }

    const endWithShift = end - pagesPerView.value + additionalShift
    const isEndWithShiftValid = endWithShift >= 1
    start = isEndWithShiftValid ? endWithShift : 1
  }

  return { start, end }
}

function initPages() {
  isLoaded.value = true
  calcPagesPerView()

  resizeCallback = calcPagesPerView
  window.addEventListener('resize', resizeCallback)
}

function destroyPages() {
  window.removeEventListener('resize', resizeCallback)
}

function calcPagesPerView() {
  const width = window.innerWidth
  if (width > 1499) {
    pagesPerView.value = initialPagesPerView.value
  } else if (width > 575) {
    pagesPerView.value = initialPagesPerView.value < 5 ? initialPagesPerView.value : 5
  } else {
    pagesPerView.value = initialPagesPerView.value < 3 ? initialPagesPerView.value : 3
  }
}

function prevPage() {
  currentPage.value -= 1
}

function nextPage() {
  currentPage.value += 1
}

function setPage(page: number) {
  currentPage.value = page
}

onMounted(initPages)
onBeforeUnmount(destroyPages)
</script>

<template>
  <div :class="{ [$style.pagination_hidden]: !isLoaded, [$style.pagination]: true }">
    <div :class="$style.pagination__container">
      <BaseButton
        :class="{
          [$style.disabled]: leftArrowDisabled,
          [$style.pagination__item]: true,
          [$style['pagination__item-arrow']]: true
        }"
        :disabled="leftArrowDisabled"
        @click="prevPage"
      >
        <div :class="$style['pagination__item-content']"><</div>
      </BaseButton>

      <BaseButton v-if="canDisplayFirstPage" :class="$style.pagination__item" @click="setPage(1)">
        <div :class="$style['pagination__item-content']">{{ 1 }}</div>
      </BaseButton>

      <div
        v-if="canDisplayLeftDots"
        :class="[$style.pagination__item, $style['pagination__item-dots']]"
      >
        ...
      </div>

      <BaseButton
        v-for="(item, index) in visiblePages"
        :key="index"
        :class="$style.pagination__item"
        :disabled="item === currentPage"
        @click="setPage(item)"
      >
        <div :class="$style['pagination__item-content']">{{ item }}</div>
      </BaseButton>

      <div
        v-if="canDisplayRightDots"
        :class="[$style.pagination__item, $style['pagination__item-dots']]"
      >
        ...
      </div>

      <BaseButton
        v-if="canDisplayLastPage"
        :class="$style.pagination__item"
        @click="setPage(totalPages)"
      >
        <div :class="$style['pagination__item-content']">{{ totalPages }}</div>
      </BaseButton>

      <BaseButton
        :class="[$style.pagination__item, $style['pagination__item-arrow']]"
        :disabled="rightArrowDisabled"
        @click="nextPage"
      >
        <div :class="$style['pagination__item-content']">></div>
      </BaseButton>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@/assets/scss/base/base-pagination';
</style>
