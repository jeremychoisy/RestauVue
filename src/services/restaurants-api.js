import { apiConfig } from '../config'

export const getRestaurants = async (page, pageSize, query) => {
    const baseUrl = apiConfig.restaurantBaseUrl;

    const pageParameter = page ? "?page=" + page : '';
    const pageSizeParameter = pageSize ? "&pagesize=" + pageSize : '';
    const queryParameter = query ? "&q=" + query : '';

    const response = await fetch(baseUrl + pageParameter + pageSizeParameter + queryParameter);
    return await response.json();
};
