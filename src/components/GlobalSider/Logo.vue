<template>
  <div class="logo">
    <router-link to="/">
      <img class="img-logo" src="@/assets/images/logo.png" alt="logo" />
      <span class="title">后台管理系统</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  padding: 0 16px;
  height: 64px;
  a {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .img-logo {
    max-width: 48px;
    max-height: 32px;
  }
  .title {
    margin-left: 8px;
    font-size: 18px;
    color: #fff;
  }
}
</style>
