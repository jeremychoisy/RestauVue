import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "./page/MainPage";
import DetailsPage from "./page/DetailsPage";
import AdminPage from "./page/AdminPage";
import * as store from './store/index'

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
        {
            path: '/admin',
            name: 'AdminPage',
            component: AdminPage,
            beforeEnter: (to, from, next) => {
                if(store.default.getters['user/isUserAdmin']) {
                    next();
                } else {
                    next('/');
                }
            }
        },
        {
            path: '/details',
            name: 'DetailsPage',
            component: DetailsPage
        },
    ]
})
