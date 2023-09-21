import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '../src/router'
import store from './store'
import './api/mock'
import cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI)
    //添加全局前置导航守卫
router.beforeEach((to, from, next) => {
    const token = cookie.get('token')
    if (!token && to.name !== 'login') {
        next({ name: 'login' }) // token不存在说明当前用户未登录，应该跳到登录页面
    } else if (token && to.name === 'login') {
        next({
            name: 'home'
        })
    } else {
        next()
    }

})
new Vue({
    render: h => h(App),
    router,
    store,
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')