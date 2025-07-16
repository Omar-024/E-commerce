import { createSlice } from "@reduxjs/toolkit";


let counterSlice =createSlice({
    name:"counter" ,
    initialState:{
        counter:0 ,

    }
})
export let counterReducer =counterSlice.reducer