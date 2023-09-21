import vuerouter from 'vue-router'
import Vue from 'vue'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

Vue.use(vuerouter)
const routes = [{
        path: '/',
        component: Main,
        name: 'main',
        redirect: '/home',
        children: [
            // { path: '/home', name: 'home', component: Home },
            // { path: '/user', name: 'user', component: User },
            // {
            //     path: "/mall",
            //     name: 'mall',
            //     component: Mall
            // }, {
            //     path: "/page1",
            //     name: 'page1',
            //     component: PageOne
            // }, {
            //     path: "/page2",
            //     name: 'page2',
            //     component: PageTwo
            // },


        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
const router = new vuerouter({
    routes
})
export default router