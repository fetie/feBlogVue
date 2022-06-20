<template>
  <div id="app" v-if="show">
    <loading></loading>
    <layout-header></layout-header>
    <layout-body></layout-body>
    <layout-footer></layout-footer>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import layoutHeader from '@/components/layout/layout-header.vue'
import layoutBody from '@/components/layout/layout-body.vue'
import layoutFooter from '@/components/layout/layout-footer.vue'
import Loading from '@/components/loading.vue'
import { useStore } from '@/store'

const store = useStore()

const show = ref(false)

Promise.all([store.dispatch('getSocials'), store.dispatch('getSiteInfo')]).then(
  () => {
    show.value = true
  },
)
</script>
<style lang="less">
#app {
  font-size: 17px;
  color: #6f6f6f;
}
</style>
