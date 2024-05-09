import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/gloable.css'
import request from './utils/request';
Vue.use(ElementUI);

// 全局注册
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)


Vue.prototype.request = request
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
