// reduxStore.ts
import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './slices/AuthenticationSlice';
import modalReducer from './slices/ModalSlice';
import bookReducer from './slices/BookSlice';
import userReducer from './slices/userSlice'; // Change to match the exact file name casing


export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    modal: modalReducer,
    book: bookReducer,
    user: userReducer, // Adding user reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
        ignoredPaths: ['book.somePath'],
        warnAfter: 100,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
