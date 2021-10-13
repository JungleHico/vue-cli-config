// 组件按需导入
import Vue from 'vue'
import {
  Alert,
  Button,
  Form,
  Layout,
  Input,
  Notification
} from 'ant-design-vue'

Vue.use(Alert)
Vue.use(Button)
Vue.use(Form)
Vue.use(Layout)
Vue.use(Input)

Vue.prototype.$notification = Notification
