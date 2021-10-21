<template>
  <a-layout-sider
    class="sidebar"
    width="256"
    :collapsed="collapsed"
    collapsible
    :trigger="null">
    <div class="logo">
      <router-link to="/">
        <img class="img-logo" src="@/assets/images/logo.png" alt="logo" />
        <span class="title" v-if="!collapsed">后台管理系统</span>
      </router-link>
    </div>

    <a-menu
      theme="dark"
      mode="inline"
      :open-keys="openKeys"
      :selected-keys="selectedKeys"
      @openChange="onOpenChange">
      <template v-for="item in menus">
        <a-menu-item v-if="!item.children" :key="item.path">
          <router-link :to="item.path">
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
            <span>{{ title(item) }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-else :key="item.path">
          <span slot="title">
            <a-icon v-if="item.meta && item.meta.icon" :type="item.meta.icon" />
            <span>{{ title(item) }}</span>
          </span>
          <a-menu-item v-for="subItem in item.children" :key="subItem.path">
            <router-link :to="subItem.path">
              <span>{{ title(subItem) }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      menus: [],
      openKeys: [], // 展开的菜单
      selectedKeys: [] // 高亮的菜单项
    }
  },
  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed,
      addRouters: state => state.permission.addRouters
    }),
    title () {
      return item => item.meta?.title || item.path
    }
  },
  created () {
    this.initMenus()
    this.setActiveKeys()
  },
  watch: {
    $route () {
      this.setActiveKeys()
    }
  },
  methods: {
    initMenus () {
      const menus = this.addRouters.find(route => route.path === '/')
      this.menus = menus?.children || []
    },
    // 根据路由高亮菜单
    setActiveKeys () {
      const path = this.$route.path
      for (const item of this.menus) {
        if (item.path === path) {
          this.selectedKeys = [item.path]
          return
        }
        if (item.children) {
          for (const subItem of item.children) {
            if (subItem.path === path) {
              this.selectedKeys = [subItem.path]
              this.openKeys = [item.path]
              return
            }
          }
        }
      }
    },
    onOpenChange (openKeys) {
      this.openKeys = openKeys
    }
  }
}
</script>

<style scoped lang="less">
.sidebar {
  // 固定导航栏
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: auto;
}

.logo {
  padding: 0 16px;
  height: 64px;
  a {
    display: flex;
    align-items: center;
    height: 100%;
    .img-logo {
      width: 48px;
      height: auto;
      /* width: auto;
      height: 48px; */
    }
    .title {
      margin-left: 8px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
