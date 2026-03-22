import { createSlice } from "@reduxjs/toolkit";


const userSlice=createSlice({
    name:'user',
    initialState:{
        userInfo:JSON.parse(localStorage.getItem("userInfo"))||{},
        token:localStorage.getItem("token")||null,
        isLoggedIng:localStorage.getItem("token")?true:false,
    },
    reducers:{
         setToken:(state,action)=>{
            console.log(action.payload.userInfo.name)
            state.token=action.payload.accessToken;
            state.isLoggedIng=true;
            state.userInfo=action.payload.userInfo;
            localStorage.setItem("token",action.payload.accessToken);
            localStorage.setItem("userInfo",JSON.stringify(action.payload.userInfo));
        },
        removeToken:(state)=>{
            state.token =null;
            state.isLoggedIng=false;
            state.userInfo={};
           localStorage.removeItem("token");
           localStorage.removeItem("userInfo");
        },
    }
})
export default userSlice;
export const {setToken,removeToken}=userSlice.actions;