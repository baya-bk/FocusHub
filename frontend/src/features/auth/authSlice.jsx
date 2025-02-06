// src/features/auth/authSlice.jsx  
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';  
import authService from '../../services/authService';  

export const registerUser = createAsyncThunk(  
    'auth/register',  
    async (userData, { rejectWithValue }) => {  
        try {  
            return await authService.register(userData);  
        } catch (error) {  
            return rejectWithValue(error.message);  
        }  
    }  
);  

export const loginUser = createAsyncThunk(  
    'auth/login',  
    async (userData, { rejectWithValue }) => {  
        try {  
            const user = await authService.login(userData);  
            localStorage.setItem('token', user.token); // If using tokens  
            return user;  
        } catch (error) {  
            return rejectWithValue(error.message);  
        }  
    }  
);  

const authSlice = createSlice({  
    name: 'auth',  
    initialState: {  
        user: null,  
        isAuthenticated: false,  
        error: null,  
    },  
    reducers: {  
        logout: (state) => {  
            state.user = null;  
            state.isAuthenticated = false;  
            localStorage.removeItem('token');  
        },  
    },  
    extraReducers: (builder) => {  
        builder  
            .addCase(registerUser.fulfilled, (state, action) => {  
                state.user = action.payload;  
                state.isAuthenticated = true;  
                state.error = null;  
            })  
            .addCase(registerUser.rejected, (state, action) => {  
                state.error = action.payload;  
            })  
            .addCase(loginUser.fulfilled, (state, action) => {  
                state.user = action.payload;  
                state.isAuthenticated = true;  
                state.error = null;  
            })  
            .addCase(loginUser.rejected, (state, action) => {  
                state.error = action.payload;  
            });  
    },  
});  

export const { logout } = authSlice.actions;  
export default authSlice.reducer;