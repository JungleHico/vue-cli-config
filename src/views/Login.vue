<template>
  <div class="login">
    <img class="logo" src="@/assets/images/logo.png" />

    <a-form class="form" :form="form" @submit="onSubmit">
      <a-alert
        class="alert"
        v-if="showErrorMsg"
        type="error"
        :show-icon="true"
        :message="errorMsg" />
      <a-form-item>
        <a-input
          size="large"
          placeholder="用户名 admin"
          v-decorator="['username', { rules: [{ required: true, message: '请输入用户名' }] }]" />
      </a-form-item>
      <a-form-item>
        <a-input-password
          size="large"
          placeholder="密码 123456"
          v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]" />
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          size="large"
          html-type="submit"
          :loading="loading"
          block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import md5 from 'md5'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      showErrorMsg: false,
      errorMsg: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['Login']),
    onSubmit (e) {
      e.preventDefault()
      this.showErrorMsg = false

      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.login(values)
        }
      })
    },
    async login (values) {
      this.loading = true

      try {
        await this.Login({
          username: values.username,
          // TODO md5 加密
          password: md5(values.password)
        })
        // 登录成功，重定向到首页
        this.$router.push('/')
      } catch (error) {
        // 登录失败
        localStorage.removeItem('token')
        const message = error.response?.data?.message
        this.errorMsg = message || '登录失败'
        this.showErrorMsg = true
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  .logo {
    width: 256px;
    height: auto;
    margin: 32px 0;
  }
  .form {
    width: 360px;
    .alert {
      margin-bottom: 24px;
    }
  }
}
</style>
