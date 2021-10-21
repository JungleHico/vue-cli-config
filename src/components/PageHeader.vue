<template>
  <div class="page-header">
    <a-tabs
      class="tabs"
      v-model="activeKey"
      type="editable-card"
      hide-add
      :tab-bar-style="{ margin: '2px 0 0', paddingTop: '4px' }"
      @edit="onEdit">
      <a-tab-pane
        v-for="item in pages"
        :key="item.fullPath"
        :tab="item.meta.title || item.fullPath"
        :closable="pages.length > 1">
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
export default {
  data () {
    return {
      fullPathList: [],
      pages: [],
      activeKey: ''
    }
  },
  watch: {
    $route ($route) {
      const { fullPath } = $route
      this.activeKey = fullPath
      if (!this.fullPathList.includes(fullPath)) {
        this.fullPathList.push(fullPath)
        this.pages.push($route)
      }
    },
    activeKey (activeKey) {
      if (activeKey !== this.$route.fullPath) {
        this.$router.push(activeKey)
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.pages.push(this.$route)
      this.fullPathList.push(this.$route.fullPath)
      this.selectedLastPath()
    },
    selectedLastPath () {
      this.activeKey = this.fullPathList[this.fullPathList.length - 1]
    },
    onEdit (targetKey, action) {
      // 关闭标签
      if (action === 'remove') {
        this.pages = this.pages.filter(page => page.fullPath !== targetKey)
        this.fullPathList = this.fullPathList.filter(path => path !== targetKey)
        this.selectedLastPath()
      }
    },
    onCloseTag (e, index) {
      e.preventDefault()
      this.tags.splice(index, 1)
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
      this.pages = this.pages.filter(page => page.fullPath === this.activeKey)
      this.fullPathList = this.fullPathList.filter(path => path === this.activeKey)
    },
    closeToTheLeft () {
      const pageIndex = this.pages.findIndex(page => page.fullPath === this.activeKey)
      const pathIndex = this.fullPathList.findIndex(path => path === this.activeKey)
      this.pages.splice(0, pageIndex)
      this.fullPathList.splice(0, pathIndex)
    },
    closeToTheRight () {
      const pageIndex = this.pages.findIndex(page => page.fullPath === this.activeKey)
      const pathIndex = this.fullPathList.findIndex(path => path === this.activeKey)
      this.pages.splice(pageIndex + 1, this.pages.length - 1 - pageIndex)
      this.fullPathList.splice(pathIndex + 1, this.fullPathList.length - 1 - pathIndex)
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
