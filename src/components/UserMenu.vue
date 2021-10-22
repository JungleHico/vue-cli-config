<template>
  <a-dropdown>
    <div class="user-wrapper">
      <a-avatar :src="info.avatar" />
      <span class="username">{{ info.username }}</span>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0" @click="onLogout">
          <a-icon type="logout" />退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
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
      info: state => state.user.info
    })
  },
  methods: {
    ...mapActions(['Logout']),
    onLogout () {
      this.$modal.confirm({
        title: '退出登录',
        content: '确定退出登录吗？',
        okType: 'danger',
        onOk: () => {
          this.Logout().then(() => {
            this.$router.push('/login')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.user-wrapper {
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
  .username {
    margin-left: 8px;
    font-size: 14px;
  }
}
</style>
