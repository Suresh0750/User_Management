import { configureStore } from "@reduxjs/toolkit";


// * userside login and logout slice
import UserReducer from "../slice/UserSlice";

export default configureStore({
    reducer:{
        user: UserReducer
    }
})