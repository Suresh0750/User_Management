import React from 'react'
// import { userVerify } from './middleware/userVerify';
import { useDispatch } from 'react-redux'
import {loginUser,logOut} from "../slice/UserSlice"
import axios from 'axios'


type Element = {
    children : any;
}


const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL

const UserProduct = ({chidren:Element}):any => {
    alert('hellow word')
    console.log(`UserProduct working`)
    // const veriftUser = userVerify()
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

export default UserProduct
// const UserProtect: ({ chidren: Element }: {
//     chidren: any;
// }) => JSX.Element