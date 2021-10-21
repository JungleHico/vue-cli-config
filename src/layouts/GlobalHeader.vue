<template>
  <a-layout-header class="header">
    <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="onToggle" />
  </a-layout-header>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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
