import { AppDispatch } from './store';
import { setMessage } from './messageSlice';

export const fetchMessage = () => async (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(setMessage('Hello from Redux Thunks!'));
  }, 1000);
};
