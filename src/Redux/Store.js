import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './counterSlice'

    configureStore({
        reducer:{
            counterReducer
        }
    })
 

