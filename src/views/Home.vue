<template>
  <div class="home">
    <img class="logo" src="@/assets/images/logo.png" alt="logo" />
    <h1 class="title">首页</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted () {
    const list = [1, 2, 3]
    console.log(list.includes(4))
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 256px;
  height: auto;
}
.title {
  margin-top: 16px;
  font-size: 18px;
}
</style>
