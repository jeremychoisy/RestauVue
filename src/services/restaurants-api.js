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
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    });
};

export const addRestaurant = async (form) => {
    return await fetch(baseUrl + 'restaurants/create', {
        method:"POST",
        body: filterFormIntoFormData(form)
    });
};

export const addMenu = async (form, id) => {
    return await fetch(baseUrl + 'restaurants/create-menu/' + id, {
        method:"POST",
        body: filterFormIntoFormData(form)
    });
};

export const addDishToGlobalMenu = async (form, id) => {
    return await fetch(baseUrl + 'restaurants/add-dish-to-global-menu/' + id, {
        method:"POST",
        body: filterFormIntoFormData(form)
    });
};

export const addDishToSpecificMenu = async (form, restaurantId, menuId) => {
    return await fetch(baseUrl + 'restaurants/add-dish-to-specific-menu/' + restaurantId + '/' + menuId, {
        method:"POST",
        body: filterFormIntoFormData(form)
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
    const url = baseUrl + 'restaurants/delete-dish-from-specific-menu/' + restaurantId + '/' + menuId
        + '/' + type + '/' + dishId;
    return await fetch(url, {
        method: "DELETE",
    });
};

// PATCH

export const updateRestaurant = async (form, id) => {
    return await fetch(baseUrl + 'restaurants/update/' + id, {
        method:"PATCH",
        body: filterFormIntoFormData(form)
    });
};

export const resetGlobalMenu = async (id) => {
    return await fetch(baseUrl + 'restaurants/reset-global-menu/' + id, {
        method:"PATCH",
    });
};

export const updateDishInSpecificMenu = async (form, restaurantId, menuId, type, dishId) => {
    return await fetch(baseUrl + 'restaurants/update-dish-in-specific-menu/' + restaurantId + '/' + menuId + '/' + type + '/' + dishId, {
        method:"PATCH",
        body: filterFormIntoFormData(form)
    });
};

export const updateDishInGlobalMenu = async (form, restaurantId, dishId) => {
    return await fetch(baseUrl + 'restaurants/update-dish-in-global-menu/' + restaurantId + '/' + dishId, {
        method:"PATCH",
        body: filterFormIntoFormData(form)
    });
};

export const updateSpecificMenu = async (form, restaurantId, menuId) => {
    return await fetch(baseUrl + 'restaurants/update-specific-menu/' + restaurantId + '/' + menuId, {
        method:"PATCH",
        body: filterFormIntoFormData(form)
    });
};

const filterFormIntoFormData = (form) => {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
        if(form[key] === undefined || form[key] === '') {
            delete form[key]
        } else if(Array.isArray(form[key])){
            form[key].forEach((element) => formData.append(key, element))
        } else {
            formData.append(key, form[key])
        }});
    return formData;
};
