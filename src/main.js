import Vue from 'vue';
import App from './app';
import { createRouter } from './route/index';
// 创建 router 实例
const router = createRouter();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')