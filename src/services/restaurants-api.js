import {apiConfig} from '../config'

const baseUrl = apiConfig.restaurantBaseUrl;

export const getRestaurants = async (page, pageSize, query) => {

    const pageParameter = page ? "?page=" + page : '';
    const pageSizeParameter = pageSize ? "&pagesize=" + pageSize : '';
    const queryParameter = query ? "&q=" + query : '';

    const response = await fetch(baseUrl + 'restaurants' + pageParameter + pageSizeParameter + queryParameter);
    return await response.json();
};

export const logIn = async (username, password) => {
    console.log('wtf');
    const url = baseUrl + 'user/log-in';
    let response = await fetch(url, {
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
    return await response.json();
};

