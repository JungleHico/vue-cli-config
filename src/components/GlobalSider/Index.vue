<template>
  <a-layout-sider
    class="sider"
    width="256px">
    <logo></logo>
    <side-menu></side-menu>
  </a-layout-sider>
</template>

<script>
import Logo from './Logo'
import SideMenu from './SideMenu'

export default {
  components: {
    Logo,
    SideMenu
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
/* 固定侧边栏 */
.sider {
  position: fixed;
  left: 0;
  height: 100vh;
  overflow: auto;
}
</style>
