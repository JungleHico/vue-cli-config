<template>
  <div class="page-header">
    <a-tabs
      v-model="activePath"
      class="tabs"
      type="editable-card"
      hide-add
      :tab-bar-style="{ margin: '2px 0 0', paddingTop: '4px' }"
      @change="onChangeTab"
      @edit="onEdit">
      <a-tab-pane
        v-for="item in visitedRoutes"
        :key="item.fullPath"
        :tab="item.meta.title || item.fullPath"
        :closable="visitedRoutes.length > 1">
      </a-tab-pane>
    </a-tabs>

    <a-dropdown class="dropdown">
      <a-icon type="more" />
      <a-menu slot="overlay" @click="onClickMenu">
        <a-menu-item key="1">
          <a><a-icon class="menu-icon" type="close" />关闭其他</a>
        </a-menu-item>
        <a-menu-item key="2">
          <a><a-icon class="menu-icon" type="arrow-left" />关闭左侧</a>
        </a-menu-item>
        <a-menu-item key="3">
          <a><a-icon class="menu-icon" type="arrow-right" />关闭右侧</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      activePath: '' // 当前路径
    }
  },
  computed: {
    ...mapState({
      visitedRoutes: state => state.pageHeader.visitedRoutes
    })
  },
  watch: {
    $route ($route) {
      this.AddVisitedRoutes($route)
      this.activePath = $route.fullPath
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions(['AddVisitedRoutes', 'DelVisitedRoutesByPath', 'SetVisitedRoutes']),
    init () {
      this.AddVisitedRoutes(this.$route)
      this.activePath = this.$route.fullPath
    },

    // 切换标签
    onChangeTab (activePath) {
      this.$router.push(activePath)
    },
    // 关闭标签
    onEdit (fullPath, action) {
      if (action === 'remove') {
        this.DelVisitedRoutesByPath(fullPath)
        this.selectedLastPath()
      }
    },
    selectedLastPath () {
      const activePath = this.visitedRoutes[this.visitedRoutes.length - 1].fullPath
      if (activePath !== this.activePath) {
        this.$router.push(activePath)
      }
    },
    onClickMenu ({ key }) {
      if (key === '1') {
        this.closeOthers()
      }
      if (key === '2') {
        this.closeToTheLeft()
      }
      if (key === '3') {
        this.closeToTheRight()
      }
    },
    closeOthers () {
      this.SetVisitedRoutes(this.visitedRoutes.filter(route => route.fullPath === this.activePath))
    },
    closeToTheLeft () {
      const index = this.visitedRoutes.findIndex(route => route.fullPath === this.activePath)
      this.visitedRoutes.splice(0, index)
    },
    closeToTheRight () {
      const index = this.visitedRoutes.findIndex(route => route.fullPath === this.activePath)
      this.visitedRoutes.splice(index + 1, this.visitedRoutes.length - 1 - index)
    }
  }
}
</script>

<style scoped lang="less">
.page-header {
  position: relative;
  width: 100%;
  margin-top: 2px;
  background-color: #fff;
  .dropdown {
    position: absolute;
    right: 0;
    top: 0;
    height: 48px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}

.page-header {
  /deep/ .ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x {
    margin-left: 12px;
  }
  /deep/ .ant-tabs-nav-container-scrolling {
    padding-right: 72px;
    padding-left: 32px;
  }
  /deep/ .ant-tabs-tab-next {
    right: 42px;
  }
}

.menu-icon {
  margin-right: 4px;
}
</style>
