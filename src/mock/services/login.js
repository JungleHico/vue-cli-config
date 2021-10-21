import Mock from 'mockjs2'
import { builder, getBody, Token } from '../util'
import md5 from 'md5'

const login = (options) => {
  const body = getBody(options)
  const { username, password } = body

  if (username !== 'admin' || password !== md5('123456')) {
    return builder(null, '账号密码错误', 400)
  }

  return builder({
    username: 'admin',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    token: Token.sign({ username }, '1h')
  }, 'success', 200)
}

const getInfo = (options) => {
  console.log('getInfo', options)
  // return builder(null, '未授权或登录已过期', 401)

  return builder({
    username: 'admin',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    roles: ['admin']
  }, 'success', 200)
}

Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/info/, 'get', getInfo)
