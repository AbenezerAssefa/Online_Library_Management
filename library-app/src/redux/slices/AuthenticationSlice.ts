import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, LoginUserPayload, RegisterUserPayload, FetchUserPayload } from '../../models/User';
import axios from 'axios';

// Define the slice state interface
interface AuthenticationSliceState {
  loggedInUser: User | undefined;
  profileUser: User | undefined;
  libraryCard: string;
  property: any;
  loading: boolean;
  error: boolean;
  registerSuccess: boolean;
  isAuthenticated: boolean;
}

// Define the initial state
const initialState: AuthenticationSliceState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedInUser') || 'null'), // Check localStorage for logged-in user
  profileUser: undefined,
  libraryCard: "",
  property: undefined,
  loading: false,
  error: false,
  registerSuccess: false,
  isAuthenticated: Boolean(localStorage.getItem('loggedInUser')), // Set based on the presence of logged-in user in localStorage
};

// Create the async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/login',
  async (user: LoginUserPayload, thunkAPI) => {
    try {
      const req = await axios.post('http://localhost:8000/auth/login', user);
      return req.data.user; // Assuming response contains user data
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue('Unexpected error occurred');
    }
  }
);

// Create the async thunk for registering a user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (user: RegisterUserPayload, thunkAPI) => {
    try {
      const req = await axios.post('http://localhost:8000/auth/register', user);
      return req.data.user; // Assuming response contains user data
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue('Unexpected error occurred');
    }
  }
);

// Create the async thunk for fetching a user
export const fetchUser = createAsyncThunk(
  'auth/fetch',
  async (payload: FetchUserPayload, thunkAPI) => {
    try {
      const req = await axios.get(`http://localhost:8000/users/${payload.userId}`);
      const user = req.data.user;
      return { user, property: payload.property }; // Return the user and property
    } catch (e) {
      const error = axios.isAxiosError(e) ? e.response?.data : 'Unexpected error occurred';
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create the async thunk for updating a user
export const UpdateUser = createAsyncThunk(
  'auth/update',
  async (payload: User, thunkAPI) => {
    try {
      const req = await axios.put(`http://localhost:8000/users`, payload);  // Use PUT for update
      return req.data.user; // Return the updated user data
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Create the async thunk for updating a user
export const getLibraryCard = createAsyncThunk(
  'auth/librarycard',
  async (userId: string, thunkAPI) => {
    try {
      const req = await axios.post(`http://localhost:8000/card`, {user:userId});  // Use PUT for update
      return req.data.libraryCard; // Return the updated user data
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Create the slice with reducers and extra reducers for async actions
export const AuthenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetRegisterSuccess(state) {
      state.registerSuccess = false;
    },
    resetUser(state, action: PayloadAction<keyof AuthenticationSliceState>) {
      // Only reset properties that can actually be set to `undefined`
      if (action.payload === 'loggedInUser' || action.payload === 'profileUser') {
        state[action.payload] = undefined;
      }
    },
    
    logout(state) {
      state.loggedInUser = undefined;
      state.isAuthenticated = false;
      localStorage.removeItem('loggedInUser'); // Remove from localStorage
    }
  },
  extraReducers: (builder) => {
    // Pending logic
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(UpdateUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });

    builder.addCase(getLibraryCard.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    // Fulfilled logic
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
      state.isAuthenticated = true;
      state.error = false;
      localStorage.setItem('loggedInUser', JSON.stringify(action.payload)); // Store user in localStorage
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.registerSuccess = true;
      state.error = false;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.profileUser = action.payload.user; // Update profileUser with the fetched user data
      state.property = action.payload.property; // Update property field with the dynamic data
    });

    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.profileUser = action.payload; // Update profileUser with the updated user data
      state.loggedInUser = action.payload; // Optionally update loggedInUser if needed
    });

    
    builder.addCase(getLibraryCard.fulfilled, (state, action) => {
      state.loading = false;
      state.libraryCard = action.payload._id; // Update profileUser with the updated user data

    });


    // Rejected logic
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
      state.profileUser = undefined;
      state.property = undefined;
    });

    builder.addCase(UpdateUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

// Export actions and the reducer
export const { resetRegisterSuccess, resetUser, logout } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
