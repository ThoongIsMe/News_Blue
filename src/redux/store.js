import { createStore, applyMiddleware } from 'redux';
//redux-logger
import { thunk } from 'redux-thunk';
import reducer from './reducers';

const middleware = [thunk];
export const store = createStore(
    reducer,
    applyMiddleware(...middleware)

);