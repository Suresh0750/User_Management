import { configureStore } from "@reduxjs/toolkit";


// * userside login and logout slice
import UserReducer from "../slice/UserSlice";
import AdminReducer from "../slice/AdminSlice"

export default configureStore({
    reducer:{
        user: UserReducer,
        admin : AdminReducer
    }
})