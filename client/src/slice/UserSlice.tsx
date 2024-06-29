import {createSlice} from '@reduxjs/toolkit'


type UserState = {
    userLogOut : boolean
}


type obj =Record <string,any>

export type UserSliceState = UserState

const initialState : UserSliceState = {
    userLogOut : false
}


export const userSlice:obj = createSlice({
    name : 'user',
    initialState,
    reducers : {
        loginUser : (state:UserSliceState,actions)=>{
            console.log(actions,'actions')
            state.userLogOut = true
        },
        logOut : (state:UserSliceState)=>{
            state.userLogOut = false
        }   
    }
})

export const {loginUser,logOut} = userSlice.actions

export default userSlice.reducer