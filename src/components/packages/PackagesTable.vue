<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { usePackagesStore } from '@/stores/packages'
import packagesApi from '@/pkg/api/packages'
import type IPackage from '@/pkg/interfaces/package'
import getPackageType from '@/pkg/plugins/get-package-type'
import { PackagesTableHeaders } from '@/pkg/configs/packages'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseLoader from '@/components/base/BaseLoader.vue'
import PackagesModal from '@/components/packages/PackagesModal.vue'

const packagesStore = usePackagesStore()

const currentPage = ref(1)

const isShowPackageModal = ref(false)
const detailedPackageData = ref<IPackage | null>(null)

function getPackageLink(item: IPackage) {
  if (item.type === 'npm') {
    return `https://www.npmjs.com/package/${item.name}`
  } else {
    return `https://github.com/${item.name}`
  }
}

watch(currentPage, (page) => {
  packagesStore.getPackagesOnPage(page)
})

watch(
  () => packagesStore.store.searchedPackages,
  () => {
    currentPage.value = 1
  }
)

onMounted(() => {
  packagesStore.getAllPackages()
})

async function toggleModal(item: IPackage) {
  detailedPackageData.value = null
  isShowPackageModal.value = true
  if (item.type === 'gh') {
    detailedPackageData.value = await packagesApi.getGitPackage(item.name)
  } else {
    detailedPackageData.value = await packagesApi.getNpmPackage(item.name)
  }
}
</script>

<template>
  <main>
    <BaseLoader v-if="packagesStore.store.isPending" />

    <BaseTable
      v-else
      v-model:current-page="currentPage"
      :headers="PackagesTableHeaders"
      :items="packagesStore.store.packagesOnPage"
      :total-pages="packagesStore.store.totalPages"
      @on-row-click="toggleModal"
    >
      <template #table-th="{ head }">
        {{ head.name }}
      </template>

      <template #table-td="{ head, item }">
        <div :class="head.class" class="column">
          <template v-if="head.code === 'type'">
            {{ getPackageType(item) }}
          </template>
          <template v-else-if="head.code === 'link'">
            <a :href="getPackageLink(item)" target="_blank">{{ getPackageLink(item) }}</a>
          </template>
          <template v-else-if="head.code === 'hits'">
            {{
              item[head.code].length > 100 ? item[head.code].slice(0, 100) + '...' : item[head.code]
            }}
          </template>
          <template v-else>
            {{ item[head.code] }}
          </template>
        </div>
      </template>
    </BaseTable>

    <PackagesModal v-model:modal-active="isShowPackageModal" :detailed-data="detailedPackageData" />
  </main>
</template>

<style lang="scss" module></style>
