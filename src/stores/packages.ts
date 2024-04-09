import { reactive } from 'vue'
import { defineStore } from 'pinia'
import packagesApi from '@/pkg/api/packages'
import type IPackage from '@/pkg/interfaces/package'

interface IPackagesStore {
  packages: IPackage[]
  packagesOnPage: IPackage[]
  searchedPackages: IPackage[]
  isPending: boolean
  page: number
  totalPages: number
}

export const usePackagesStore = defineStore('counter', () => {
  const DEFAULT_PAGE_SIZE = 10

  const store = reactive<IPackagesStore>({
    packages: [],
    packagesOnPage: [],
    searchedPackages: [],
    isPending: true,
    page: 1,
    totalPages: 1
  })

  async function getAllPackages() {
    store.isPending = true

    try {
      store.packages = await packagesApi.getPackages()
      store.searchedPackages = store.packages

      resetPagination()
    } catch (e) {
      console.error(e)
    } finally {
      store.isPending = false
    }
  }

  function searchPackages(searchValue: string) {
    if (searchValue) {
      store.searchedPackages = store.packages.filter((currentPackage) =>
        currentPackage.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    } else {
      store.searchedPackages = store.packages
    }

    resetPagination()
  }

  function getPackagesOnPage(page: number) {
    const startIndex = (page - 1) * DEFAULT_PAGE_SIZE
    const endIndex = startIndex + DEFAULT_PAGE_SIZE

    store.packagesOnPage = store.searchedPackages.slice(startIndex, endIndex)
  }

  function resetPagination() {
    store.totalPages = Math.ceil(store.searchedPackages.length / DEFAULT_PAGE_SIZE)
    getPackagesOnPage(1)
  }

  return { store, getAllPackages, getPackagesOnPage, searchPackages }
})
