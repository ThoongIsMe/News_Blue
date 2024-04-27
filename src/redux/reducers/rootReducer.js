import { combineReducers } from 'redux';
import reducerUser from './reducersUser';

const rootReducer = combineReducers({
    user: reducerUser,
    // other reducers if any
});

export default rootReducer;