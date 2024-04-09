<script setup lang="ts">
import TheHeader from '@/components/general/TheHeader.vue'
import PackagesTable from '@/components/packages/PackagesTable.vue'
import TheFooter from '@/components/general/TheFooter.vue'
</script>

<template>
  <div class="wrapper">
    <TheHeader />

    <PackagesTable />

    <TheFooter />
  </div>
</template>

<style module></style>
