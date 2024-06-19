import { applyMiddleware, configureStore, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';


const store = createStore(rootReducer, applyMiddleware(thunk));


export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
