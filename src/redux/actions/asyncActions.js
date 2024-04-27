// asyncActions.js
import { addItem, removeItem, updateItem, fetchItems } from './actions';

import { getUserFromApiAsync } from '../../helper/api'

// Asynchronous actions
export const fetchItemsAsync = () => {
    return async dispatch => {
        try {
            // Fetch items from API
            const userData = await getUserFromApiAsync();
            // Dispatch action to update state
            dispatch(fetchItems(userData));
            console.error('Error fetching items:', userData);

        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
};

// Similarly, define other async actions for CRUD operations