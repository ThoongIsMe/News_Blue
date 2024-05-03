import axios from 'axios';
import Url from '../constants/Url';

export const getNewsFromApiAsync = async() => {
    try {
        const response = await axios.get(`http://${Url.IP_WF}:${Url.PORT}/articles`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCategoriesFromApiAsync = async() => {
    try {
        const response = await axios.get(`http://${Url.IP_WF}:${Url.PORT}/categories`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getUserFromApiAsync = async() => {
    try {
        const response = await axios.get(`http://${Url.IP_WF}:${Url.PORT}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const getFavoritesFromApiAsync = async() => {
    try {
        const response = await axios.get(`http://${Url.IP_WF}:${Url.PORT}/favorites`);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};




export default { getNewsFromApiAsync, getCategoriesFromApiAsync, getUserFromApiAsync, getFavoritesFromApiAsync };