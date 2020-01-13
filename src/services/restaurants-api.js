import {apiConfig} from '../config'

const baseUrl = apiConfig.restaurantBaseUrl;

// GET

export const getRestaurants = async (page, pageSize, query) => {
    const pageParameter = page ? "?page=" + page : '';
    const pageSizeParameter = pageSize ? "&pagesize=" + pageSize : '';
    const queryParameter = query ? "&q=" + query : '';

    return await fetch(baseUrl + 'restaurants' + pageParameter + pageSizeParameter + queryParameter);
};

// POST

export const logIn = async (username, password) => {
    return await fetch(baseUrl + 'user/log-in', {
        method:"POST",
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
};

export const addRestaurant = async (form) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/create', {
        method:"POST",
        body: formData
    });
};

export const addMenu = async (form, id) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/create-menu/' + id, {
        method:"POST",
        body: formData
    });
};

export const addDishToGlobalMenu = async (form, id) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/add-dish-to-global-menu/' + id, {
        method:"POST",
        body: formData
    });
};

export const addDishToSpecificMenu = async (form, restaurantId, menuId) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/add-dish-to-specific-menu/' + restaurantId + '/' + menuId, {
        method:"POST",
        body: formData
    });
};

// DELETE

export const deleteRestaurant = async (id) => {
    const url = baseUrl + 'restaurants/delete/' + id;
    return await fetch(url, {
        method: "DELETE",
    });
};

export const deleteSpecificMenu = async (restaurantId, menuId) => {
    const url = baseUrl + 'restaurants/delete-specific-menu/' + restaurantId + '/' + menuId;
    return await fetch(url, {
        method: "DELETE",
    });
};

export const deleteDishFromGlobalMenu = async (restaurantId, dishId) => {
    const url = baseUrl + 'restaurants/delete-dish-from-global-menu/' + restaurantId + '/' + dishId;
    return await fetch(url, {
        method: "DELETE",
    });
};

export const deleteDishFromSpecificMenu = async (restaurantId, menuId, type, dishId) => {
    const url = baseUrl + 'restaurants/delete-dish-from-global-menu/' + restaurantId + '/' + menuId
        + '/' + type + '/' + dishId;
    return await fetch(url, {
        method: "DELETE",
    });
};

// PATCH

export const updateRestaurant = async (form, id) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/update/' + id, {
        method:"PATCH",
        body: formData
    });
};

export const resetGlobalMenu = async (id) => {
    return await fetch(baseUrl + 'restaurants/reset-global-menu/' + id, {
        method:"PATCH",
    });
};

export const updateDishInSpecificMenu = async (form, restaurantId, menuId, type, dishId) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/update-dish-in-specific-menu/' + restaurantId + '/' + menuId + '/' + type + '/' + dishId, {
        method:"PATCH",
        body: formData
    });
};

export const updateDishInGlobalMenu = async (form, restaurantId, dishId) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/update-dish-in-global-menu/' + restaurantId + '/' + dishId, {
        method:"PATCH",
        body: formData
    });
};

export const updateSpecificMenu = async (form, restaurantId, menuId) => {
    const formData = new FormData(filterForm(form));
    return await fetch(baseUrl + 'restaurants/update-specific-menu/' + restaurantId + '/' + menuId, {
        method:"PATCH",
        body: formData
    });
};

const filterForm = (form) => {
    Object.keys(form).forEach(key => (form[key] === undefined || form[key] === '') && delete form[key]);
};
