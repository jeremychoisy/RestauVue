// initial state
import {getRestaurants} from "../../services";

const state = {
    restaurants: [],
    count: 0,
    isPending: false,
    currentRestaurant: {}
};

// getters
const getters = {};

// actions
const actions = {
    async getRestaurants ({ commit, state }, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await getRestaurants(payload.page, payload.pageSize, payload.query);
        commit('setRestaurants', restaurantsResponse);
        commit('setIsPending', false);
        commit('setCurrentRestaurant', state.restaurants[0]);
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
