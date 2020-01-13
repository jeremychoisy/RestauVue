// initial state
import {getRestaurants} from "../../services";

const state = {
    restaurants: [],
    count: 0,
    isPending: false,
    currentRestaurant: {},
    isFailure: ''
};

// getters
const getters = {};

// actions
const actions = {
    async getRestaurants ({ commit, state }, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await getRestaurants(payload.page, payload.pageSize, payload.query);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if(status !== 200){
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setRestaurants', json);
            commit('setCurrentRestaurant', state.restaurants[0]);
            commit('setIsPending', false);
        }
    }
};

// mutations
const mutations = {
    setRestaurants (state, restaurants) {
        Object.assign(state, restaurants);
    },
    setIsPending (state, boolean) {
        state.isPending = boolean;
    },
    setIsFailure(state, string) {
        state.isFailure = string;
    },
    setCurrentRestaurant (state, restaurant){
        state.currentRestaurant = restaurant;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
