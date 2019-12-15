import Vue from 'vue'
import router from './router'
import App from './App.vue'
import ElementUI from 'element-ui';

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCyZlvP6hBkWH7AKttIegLBdXWSmxO06Ag',
        libraries: 'places'
    }
});

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app');

