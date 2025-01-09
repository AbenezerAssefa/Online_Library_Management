import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './slices/AuthenticationSlice';
import modalReducer from './slices/ModalSlice';
import bookReducer from './slices/BookSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    modal: modalReducer,
    book: bookReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['book/addRecord'],
        ignoredPaths: ['book.records'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
