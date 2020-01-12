import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from "./page/MainPage";
import DetailsPage from "./page/DetailsPage";

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
            path: '/details',
            name: 'DetailsPage',
            component: DetailsPage
        },
    ]
})
