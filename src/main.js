import Vue from 'vue'
import router from './router'
import App from './App.vue'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps';

locale.use(lang);
Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCyZlvP6hBkWH7AKttIegLBdXWSmxO06Ag',
        libraries: 'places'
    }
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App),
}).$mount('#app');

