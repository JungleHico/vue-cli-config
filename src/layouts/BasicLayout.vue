<template>
  <a-layout class="basic-layout">
    <sidebar></sidebar>
    <a-layout class="layout" :style="layoutStyle">
      <global-header></global-header>
      <a-layout-content class="content-wrapper">
        <page-header></page-header>
        <div class="content">
          <transition name="slide-in">
            <keep-alive :include="cachedViews">
              <router-view :key="$route.fullPath" />
            </keep-alive>
          </transition>
        </div>
      </a-layout-content>
    </a-layout>

    <a-back-top />
  </a-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Sidebar from './Sidebar'
import GlobalHeader from './GlobalHeader'
import PageHeader from '@/components/PageHeader'

export default {
  components: {
    Sidebar,
    GlobalHeader,
    PageHeader
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed
    }),
    ...mapGetters(['cachedViews']),
    // 主体内容宽度随侧边栏收起/展开变化
    layoutStyle () {
      return this.collapsed ? { marginLeft: '80px', width: 'calc(100% - 80px)' } : { marginLeft: '256px', width: 'calc(100% - 256px)' }
    }
  }
}
</script>

<style scoped lang="less">
.layout {
  min-height: 100vh;
  transition: all 0.2s;
}

.content-wrapper {
  background-color: #f5f5f5;
  .content {
    margin: 16px;
    padding: 16px;
    background-color: #fff;
  }
}

// 页面切换动画
.slide-in-enter-active {
  transition: all .5s;
}
.slide-in-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.slide-in-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
