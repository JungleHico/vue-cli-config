<template>
  <a-layout>
    <global-sider></global-sider>
    <a-layout>
      <router-view />
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalSider from '@/components/GlobalSider/Index'

export default {
  components: {
    GlobalSider
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
