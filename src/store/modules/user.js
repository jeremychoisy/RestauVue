// initial state
import {logIn} from "../../services";

const state = {
    username: '',
    isAdmin: false,
    isPending: false,
    isFailure: ''
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
        const response = await logIn(payload.username, payload.password);
        const status = response.status;
        const json = await response.json();
        if(status !== 200){
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setUser', json.user);
            commit('setIsFailure', '');
            commit('setIsPending', false);
        }
    },
    resetUser ({commit}){
        commit('resetUser');
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
    setIsFailure(state, string) {
        state.isFailure = string;
    },
    resetUser(state){
        state.username = '';
        state.isAdmin = false;
        state.isPending = false;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
