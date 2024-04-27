// reducersUser.js
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const FETCH_ITEMS = 'FETCH_ITEMS';

const initialState = {
    items: [], // Make sure this matches the property you're trying to access
};


const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case UPDATE_ITEM:
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                ),
            };
        case FETCH_ITEMS:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default reducerUser;