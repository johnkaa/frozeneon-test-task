<script setup lang="ts"></script>

<template>
  <footer :class="$style.footer">
    <div>Zahorulko Vladyslav</div>
    <a href="https://www.linkedin.com/in/vladyslav-zahorulko-613863203/" target="_blank">
      <img
        :class="$style.footer__image"
        src="https://media.licdn.com/dms/image/D4E03AQE9xWoUtW8j1Q/profile-displayphoto-shrink_800_800/0/1709897684607?e=1718236800&v=beta&t=bWChUKh_kC1DYPRE089cYz2Nc9_vO1tVkBoOKM562Wg"
        width="80"
        alt="Zahorulko Vladyslav"
      />
    </a>
    <a href="https://github.com/johnkaa" target="_blank">GitHub</a>
  </footer>
</template>

<style lang="scss" module>
@import '@/assets/scss/general/the-footer';
</style>
