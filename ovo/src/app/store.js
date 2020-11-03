import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from '../Slices/gamesSlice';

export default configureStore({
  reducer: {
    games: gamesReducer,
  },
});
