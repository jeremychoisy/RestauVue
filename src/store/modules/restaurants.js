// initial state
import {getRestaurants} from "../../services";

const state = {
    restaurants: [],
    resultsCount: 0,
    totalCount: 0,
    next: false,
    isPending: false
};

// getters
const getters = {};

// actions
const actions = {
    async getRestaurants ({ commit }, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await getRestaurants(payload.page, payload.pageSize, payload.query);
        commit('setRestaurants', restaurantsResponse);
        commit('setIsPending', false);
    }
};

// mutations
const mutations = {
    setRestaurants (state, restaurants) {
        Object.assign(state, restaurants);
    },
    setIsPending (state, boolean) {
        state.isPending = boolean;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
