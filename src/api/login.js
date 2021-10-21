import { post, get } from './utils/http'

// 登录接口
export const login = data => post('/user/login', data)

// 获取用户基本信息
export const getInfo = () => get('/user/info')
