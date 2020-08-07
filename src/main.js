import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import global from './components/global/global' // 全局变量
import common from './utils/filters/common'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint);
Vue.use(require('vue-wechat-title')); // 自定义title
Vue.prototype.$http = axios
Vue.prototype.global = global // 全局变量

// 导出的是对象，可以直接通过 key 和 value 来获得过滤器的名和过滤器的方法
Object.keys(common).forEach(key => {
  Vue.filter(key, common[key])
})

Vue.config.productionTip = false

// 忽略微信自定义标签
Vue.config.ignoredElements = [
  'wx-open-launch-app',
];

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  // if(to.meta.title) {
  //   document.title = to.meta.title
  // }
  next();
})