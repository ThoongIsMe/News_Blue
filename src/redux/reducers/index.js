    import { combineReducers } from "redux";
    import info from './infoUserReducers';
    import check from './checkLoadReducer'

    const reducers = combineReducers({
        personalInfo: info,
        checkInfo: check
    });

    export default (state, action) => reducers(state, action);