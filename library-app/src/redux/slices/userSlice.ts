// slices/UserSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  role: 'admin' | 'user' | null; // Role can be 'admin' or 'user', null means no user
  isAuthenticated: boolean;
}

const initialState: UserState = {
  role: null, // No user logged in by default
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<'admin' | 'user' | null>) => {
      state.role = action.payload; // Update user role
    },
    setAuthenticationStatus: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload; // Update authentication status
    },
  },
});

export const { setUserRole, setAuthenticationStatus } = userSlice.actions;
export default userSlice.reducer;
