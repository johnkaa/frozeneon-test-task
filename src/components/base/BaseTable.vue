<script lang="ts" setup>
import type ITableHeader from '@/pkg/interfaces/table-header'
import BasePagination from '@/components/base/BasePagination.vue'
import { useVModel } from '@vueuse/core'

interface IProps {
  headers: ITableHeader[]
  items: any[]
  currentPage: number
  totalPages: number
}
const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'on-row-click', value: any): void
}>()

const currentPage = useVModel(props, 'currentPage', emit)
</script>

<template>
  <div :class="$style['base-table']">
    <div :class="$style['base-table__wrapper']">
      <table :class="$style['base-table__container']">
        <thead :class="$style['base-table__header']">
          <tr :class="$style['base-table__header-row']">
            <th
              v-for="(head, headIndex) in props.headers"
              :key="headIndex"
              :class="$style['base-table__header-cell']"
              :style="head.style"
            >
              <slot name="table-th" :head="head" />
            </th>
          </tr>
        </thead>

        <tbody :class="$style['base-table__body']">
          <tr
            v-for="(item, itemIndex) in props.items"
            :key="itemIndex"
            :class="$style['base-table__body-row']"
            @click="emit('on-row-click', item)"
          >
            <td
              v-for="(head, headIndex) in props.headers"
              :key="headIndex"
              :class="$style['base-table__body-cell']"
            >
              <slot name="table-td" :head="head" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BasePagination
      v-if="props.totalPages > 1"
      v-model:current-page="currentPage"
      :total-pages="props.totalPages"
    />

    <div v-if="!props.items.length" :class="$style['base-table__empty']">Packages not found</div>
  </div>
</template>

<style lang="scss" module>
@import '@/assets/scss/base/base-table';
</style>
