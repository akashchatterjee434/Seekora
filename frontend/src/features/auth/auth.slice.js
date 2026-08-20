import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        user:null,
        loading:false,
        err:null,
    },

    reducers:{
        setUser:(state, action)=>{
          state.user = action.payload
        },
        setLoading:(state, action)=>{
            state.loading = action.payload
        },
        setError:(state, action)=>{
            state.error = action.payload
        },
    }
})

export const {setUser, setLoading, setError} = authSlice.action

export default authSlice.reducers