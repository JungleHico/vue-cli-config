import jwt from 'jsonwebtoken'

// 构建返回数据
export const builder = (data, message, code = 0, headers = {}) => {
  const response = {
    message: message || '',
    timestamp: new Date().getTime(),
    data,
    code: 0
  }
  if (code) {
    response.code = code
    response._status = code
  }
  if (headers && typeof headers === 'object' && Object.keys(headers).length > 0) {
    response.headers = headers
  }
  return response
}

// 获取请求参数
export const getParams = (options) => {
  const search = options.url.split('?')[1]
  if (search) {
    const params = {}
    search.split('&').forEach(keyValueString => {
      const keyValue = keyValueString.split('=')
      params[keyValue[0]] = keyValue[1]
    })
    return params
  }
  return {}
}

// 获取请求体(post)
export const getBody = (options) => {
  return options.body ? JSON.parse(options.body) : {}
}

// token 生成和校验
export const Token = {
  sign (data, time) {
    return jwt.sign(data, 'token', { expiresIn: time })
  },
  async verify (authorization) {
    try {
      if (authorization && authorization.includes('Bearer')) {
        const token = authorization.replace('Bearer ', '')
        const data = jwt.verify(token, 'token')
        return data
      } else {
        return Promise.reject(new Error('invalid token'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
