import { configureStore } from "@reduxjs/toolkit";


// * userside login and logout slice
import UserReducer from "../slice/UserSlice";
import AdminReducer from "../slice/AdminSlice"

const store =  configureStore({
    reducer:{
        user: UserReducer,
        admin : AdminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export default store;