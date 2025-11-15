import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import resultsReducer from './slices/resultsSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    results: resultsReducer,
    users: usersReducer,
  },
});

