import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from './axios'
import store from './store'
import common from './utils/filters/common' // 过滤器
import global from './components/global/global' // 全局变量
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import preview from 'vue-photo-preview' // 全屏预览图片
import 'vue-photo-preview/dist/skin.css'

Vue.config.productionTip = false

Vue.prototype.$http = axios

Object.keys(common).forEach(key => {
  Vue.filter(key, common[key])
})

Vue.prototype.global = global // 全局变量

Vue.config.ignoredElements = [ // 忽略微信开放标签
  'wx-open-launch-app',
];

Vue.use(Mint);

let option = {
  loop: false,
  bgOpacity: .9,
  spacing: 0,
  arrowEl: false,
  tapToClose: true,
} // option配置请查看 http://photoswipe.com/documentation/options.html
Vue.use(preview, option)

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
})