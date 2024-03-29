// 组件按需导入
import Vue from 'vue'
import {
  Alert,
  Avatar,
  BackTop,
  Button,
  Dropdown,
  Form,
  Icon,
  Input,
  Layout,
  Menu,
  Modal,
  Tabs
} from 'ant-design-vue'

Vue.use(Alert)
Vue.use(Avatar)
Vue.use(BackTop)
Vue.use(Button)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Tabs)

Vue.prototype.$modal = Modal
