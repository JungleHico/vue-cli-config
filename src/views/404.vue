<template>
  <div class="wrapper">
    <img class="img" src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg" alt="404" />
    <div class="status">404</div>
    <div class="message">对不起，你所访问的页面不存在</div>
    <a-button class="btn" type="primary" @click="onBackHome">返回首页</a-button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    onBackHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img {
  width: 300px;
  height: auto;
  margin-top: 24px;
}
.status {
  margin-top: 32px;
  font-size: 28px;
  font-weight: 700;
}
.message {
  margin-top: 16px;
  font-size: 16px;
}
.btn {
  margin-top: 16px;
}
</style>
