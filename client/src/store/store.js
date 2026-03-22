import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../slices/apiSlice';
import userSlice from '../slices/users/userSlice';
const store=configureStore({
    reducer:{
        user:userSlice.reducer,
        [ apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


export default store;