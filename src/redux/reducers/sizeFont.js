// checkLoadReducer.js
const initialState = {
    fontSize: 16,
};

const sizeFontReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SIZE_FONT':
            return {
                ...state,
                fontSize: action.payload,
            };
        default:
            return state;
    }
};

export default sizeFontReducer;