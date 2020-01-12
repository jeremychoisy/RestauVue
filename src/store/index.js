import Vue from 'vue'
import Vuex from 'vuex'
import restaurants from "./modules/restaurants";
import user from "./modules/user"
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: window.localStorage
});

export default new Vuex.Store({
    modules: {
        restaurants,
        user
    },
    plugins: [vuexPersist.plugin]
})
