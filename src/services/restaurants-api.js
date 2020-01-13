import {apiConfig} from '../config'

const baseUrl = apiConfig.restaurantBaseUrl;

export const getRestaurants = async (page, pageSize, query) => {
    const pageParameter = page ? "?page=" + page : '';
    const pageSizeParameter = pageSize ? "&pagesize=" + pageSize : '';
    const queryParameter = query ? "&q=" + query : '';

    return await fetch(baseUrl + 'restaurants' + pageParameter + pageSizeParameter + queryParameter);
};

export const deleteRestaurant = async (id) => {
    const url = baseUrl + 'restaurants/delete/' + id;
    return await fetch(url, {
        method: "DELETE",
    });
};

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

