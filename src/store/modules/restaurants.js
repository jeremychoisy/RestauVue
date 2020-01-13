// initial state
import {
    addDishToGlobalMenu,
    addDishToSpecificMenu,
    addMenu,
    addRestaurant, deleteDishFromGlobalMenu, deleteDishFromSpecificMenu,
    deleteRestaurant, deleteSpecificMenu,
    getRestaurants, updateDishInGlobalMenu, updateDishInSpecificMenu, updateRestaurant, updateSpecificMenu
} from "../../services";

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
    // GET
    async getRestaurants({commit, state}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await getRestaurants(payload.page, payload.pageSize, payload.query);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setRestaurants', json);
            commit('setCurrentRestaurant', state.restaurants[0]);
            commit('setIsPending', false);
        }
    },
    // POST
    async addRestaurant({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await addRestaurant(payload.restaurantCreationForm);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async addDishToGlobalMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await addDishToGlobalMenu(payload.dishCreationForm, payload.restaurantId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async addDishToSpecificMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await addDishToSpecificMenu(payload.dishCreationForm, payload.restaurantId, payload.menuId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async addMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await addMenu(payload.menuCreationForm, payload.restaurantId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    // DELETE
    async deleteRestaurant({commit, dispatch}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await deleteRestaurant(payload.restaurantId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            dispatch('getRestaurants', {page:payload.page, pageSize:payload.pageSize,query:payload.query});
        }
    },
    async deleteSpecificMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await deleteSpecificMenu(payload.restaurantId, payload.menuId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async deleteDishFromGlobalMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await deleteDishFromGlobalMenu(payload.restaurantId, payload.dishId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async deleteDishFromSpecificMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await deleteDishFromSpecificMenu(payload.restaurantId, payload.menuId, payload.type, payload.dishId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    // UPDATE
    async updateRestaurant({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await updateRestaurant(payload.restaurantUpdateForm, payload.restaurantId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async updateDishInGlobalMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await updateDishInGlobalMenu(payload.dishUpdateForm, payload.restaurantId, payload.dishId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async updateDishInSpecificMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await updateDishInSpecificMenu(payload.dishUpdateForm, payload.restaurantId, payload.menuId, payload.type, payload.dishId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    },
    async UpdateSpecificMenu({commit}, payload) {
        commit('setIsPending', true);
        const restaurantsResponse = await updateSpecificMenu(payload.menuUpdateForm, payload.restaurantId, payload.menuId);
        const status = restaurantsResponse.status;
        const json = await restaurantsResponse.json();
        if (status !== 200) {
            const message = json.message;
            commit('setIsFailure', message);
            commit('setIsPending', false);
        } else {
            commit('setCurrentRestaurant', json.restaurant);
        }
    }
};

// mutations
const mutations = {
    setRestaurants(state, restaurants) {
        Object.assign(state, restaurants);
    },
    setIsPending(state, boolean) {
        state.isPending = boolean;
    },
    setIsFailure(state, string) {
        state.isFailure = string;
    },
    setCurrentRestaurant(state, restaurant) {
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
