import {createSlice} from '@reduxjs/toolkit'


type UserState = {
    adminLogout : boolean
}


type obj =Record <string,any>

export type AdminSliceState = UserState

const initialState : AdminSliceState = {
    adminLogout : false
}


export const AdminSlice:obj = createSlice({
    name : 'Admin',
    initialState,
    reducers : {
        AdminLogin : (state:AdminSliceState)=>{
            state.adminLogout = true
        },
        AdminLogout : (state:AdminSliceState)=>{
            state.adminLogout = false
        }   
    }
})

export const {AdminLogin,AdminLogout} = AdminSlice.actions

export default AdminSlice.reducers