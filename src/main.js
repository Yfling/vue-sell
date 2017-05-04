// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from './components/goods/goods'
import seller from './components/seller/seller'
import ratings from './components/ratings/ratings'

import './common/scss/index.scss';

Vue.config.productionTip = false

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);

const app = Vue.extend(App);
// 配置路由
const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller }
  ]
})

// 打开界面的默认页面
router.push('/seller');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
