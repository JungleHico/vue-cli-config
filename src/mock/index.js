if (process.env.NODE_ENV !== 'production') {
  const Mock = require('mockjs2')

  require('./services/login')

  Mock.setup(500)
}
