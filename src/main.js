import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { eleComponents, eleDirectives } from '@/element'
import 'normalize.css/normalize.css' // normalize.css 样式格式化
import api from './api'
import * as filters from 'utils/filters'
import ViserVue from 'viser-vue'
import './mock'

Vue.config.productionTip = false

Object.keys(eleComponents).forEach(component => {
  Vue.use(eleComponents[component])
})
Object.keys(eleDirectives).forEach(directive => {
  Vue.prototype[directive] = eleDirectives[directive]
})
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.$api = api
Vue.prototype.$ELEMENT = { size: 'small' }

Vue.use(ViserVue)
/* global G2 */
G2.Global.renderer = 'canvas'
console.log(Vue._installedPlugins)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
