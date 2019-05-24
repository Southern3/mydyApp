import 'lib-flexible/flexible.js'


import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { Row, Col, Icon, Toast, Loading, Lazyload, NavBar, Search, Rate} from 'vant'

Vue.use(Row).use(Col).use(Icon).use(Toast).use(Loading).use(Lazyload).use(NavBar).use(Search).use(Rate)

Vue.use(VueAxios, axios)

//Vue.use(Vuex)

//import {  Message, Notification   } from 'element-ui'
//Vue.component(Tabs.name,Tabs);
//Vue.component(Message);
//Vue.component(Notification);

Vue.use(ElementUI)
//导入路由
import router from './router/index.js'
import store from './store/index.js'//引入store

Vue.config.productionTip = false

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
