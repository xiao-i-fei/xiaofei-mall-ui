import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/xiaofei.scss'
import '@/assets/style/mall.scss'
import '@/assets/style/base.css'
import '@/assets/iconfont/iconfont.css'
import './permission'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
}).$mount('#app')
