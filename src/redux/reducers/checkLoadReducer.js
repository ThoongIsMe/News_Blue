// checkLoadReducer.js
const initialState = {
    checkLoad: false,
};

const checkLoadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHECK_LOAD':
            return {
                ...state,
                checkLoad: action.payload,
            };
        default:
            return state;
    }
};

export default checkLoadReducer;