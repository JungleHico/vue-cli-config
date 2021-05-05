import {
// get
// post
} from './utils/http'

// TODO 登录接口
// export const login = data => post('/user/login', data)
// 模拟登陆接口
export const login = async (data) => {
  try {
    const res = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.account === 'admin' && data.password === 'e10adc3949ba59abbe56e057f20f883e') {
          console.log('账号密码正确')
          resolve({
            data: {
              data: {
                token: 'asdjlk'
              }
            }
          })
        } else {
          console.log('账号密码不正确')
          reject(new Error('账号密码不正确'))
        }
      }, 1000)
    })
    return res
  } catch (error) {
    return Promise.reject(error)
  }
}

// TODO 获取用户基本信息（检查登录状态）
// export const getLoginInfo = () => get('/user/info')
// 模拟账号数据
export const getLoginInfo = async () => {
  return {
    data: {
      data: {
        username: 'admin'
      }
    }
  }
}
