    import { combineReducers } from "redux";
    import info from './infoUserReducers';

    const reducers = combineReducers({
        personalInfo: info
    });

    export default (state, action) => reducers(state, action);