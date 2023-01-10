import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
}

export const login = createAsyncThunk('auth/user', async (user, thunkAPI) => {
  try {
    const response = await authService.login();
    if (response.response) throw response;
    return response;
  } catch (error: any) {
    const message = (error.response || error.response.data || error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.user = null;
    })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;