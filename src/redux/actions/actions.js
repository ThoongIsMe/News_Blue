// actions.js
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, FETCH_ITEMS } from '../reducers/reducersUser';

// actions.js
export const addItem = item => ({
    type: ADD_ITEM,
    payload: item,
});

export const removeItem = itemId => ({
    type: REMOVE_ITEM,
    payload: itemId,
});

export const updateItem = item => ({
    type: UPDATE_ITEM,
    payload: item,
});

export const fetchItems = items => ({
    type: FETCH_ITEMS,
    payload: items,
});