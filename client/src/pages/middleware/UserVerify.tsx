import React from 'react'
import { useDispatch } from 'react-redux'
import {loginUser,logOut} from '../../slice/UserSlice'
import axios from 'axios'


const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL

export function userVerify() {

    console.log(`verify token`)
    const dispatch = useDispatch()

    const jwt : string | null = localStorage.getItem("userJWT")

    if(!jwt){
        dispatch(logOut())
        return 
    } 

    const verifyUser = async ()=>{
        const response = await axios.post(`${SERVERSIDE_URL}/user/verifyUser`,{jwt})
        console.log(`function working`)
    }
    verifyUser()
  
}






