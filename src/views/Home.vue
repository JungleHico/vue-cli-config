<template>
  <div>
    <p class="title">首页</p>
    <p>欢迎你！{{ info.username }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      info: state => state.user.info
    })
  }
}
</script>

<style scoped>
.title {
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
