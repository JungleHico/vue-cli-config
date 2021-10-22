<template>
  <a-layout-header class="header">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="onToggle" />
    <user-menu></user-menu>
  </a-layout-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserMenu from '@/components/UserMenu'

export default {
  components: {
    UserMenu
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      collapsed: state => state.app.collapsed
    })
  },
  methods: {
    ...mapActions(['SetCollapsed']),
    onToggle () {
      this.SetCollapsed(!this.collapsed)
    }
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: #fff;
  .trigger {
    height: 64px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      background-color: rgba(0, 0, 0, .05);
    }
  }
}
</style>
