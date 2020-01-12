// initial state
import {logIn} from "../../services";

const state = {
    username: '',
    isAdmin: false,
    isPending: false
};

// getters
const getters = {
    isUserAdmin: (state) => {
        return state.isAdmin;
    }
};

// actions
const actions = {
    async login ({ commit }, payload) {
        commit('setIsPending', true);
        const user = await logIn(payload.username, payload.password);
        commit('setUser', user.user);
        commit('setIsPending', false);
    }
};

// mutations
const mutations = {
    setUser (state, user) {
            state.username = user.username;
            state.isAdmin = user.rank === 'admin';
    },
    setIsPending (state, boolean) {
        state.isPending = boolean;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
