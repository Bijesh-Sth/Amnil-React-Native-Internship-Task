import { combineReducers } from 'redux';
import messageReducer from './messageSlice';

const rootReducer = combineReducers({
  message: messageReducer,
});

export default rootReducer;
