import Vue from 'vue'
import router from './router'
import App from './App.vue'

import ElementUI from 'element-ui';
import { Button, } from 'element-ui';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component(Button.name, Button);

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app');

