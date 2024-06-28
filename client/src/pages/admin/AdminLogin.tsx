import React,{useState,useEffect} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import axios from 'axios'
import{Link, useNavigate} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Admin from "../../Utils/AdminDetailstype.js"
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import {AdminLogin} from "../../slice/AdminSlice.js"
// import { AdminLogin } from '../../slice/AdminSlice'


const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL
// * valdition schema
const schema = yup.object().shape({
  adminEmail: yup.string().email('Please enter a valid email').required('Email is mandatory'),
  passWord: yup.string()
  .required('Password is mandatory')
  .min(6, 'Minimum 6 characters required')
  .max(15, 'Password should be less than 15 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
})

const AdminLoginFun = () => {

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver : yupResolver(schema)
      })


      
  // * show the input error
  const [error,setErrors] = useState<string>('')
  const Navigate = useNavigate()  
  const dispatch = useDispatch()


  // * show the error message to the user
  useEffect(()=>{
    for(const key in errors){
      
      if(errors[key]['message']){
        setErrors(errors[key]["message"] as string)
        break;
      }
    }
    if(!Object.keys(errors)?.length){
      setErrors('')
    }
  },[Object.keys(errors).length])

  
  // * toast 
  const toastOptions: ToastOptions = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };


  const onSubmit : SubmitHandler<Admin> = async data=>{
    try{
      console.log(data)
      let response : any = await toast.promise(
        axios.post(`${SERVERSIDE_URL}/admin/login`,data),
        {
          pending : "Login",
          success : "Admin login successfully",
          error : "Failed to login"
        },
        toastOptions
      );

      console.log("response",response)
      console.log("response",response.data)

      if(response?.data?.success){

        localStorage.setItem("adminJWT",response.data.token)
        dispatch(AdminLogin())

        setTimeout(()=>{
          Navigate("/Dashboard")
        },1500)
        
      }

    }catch(err:any){
      setErrors(err.response.data)
      console.log(err.response.data)
      console.log(err)
       toast.error(err?.response?.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });// console.log(err?.message)

    }
  }


  return (
    <div>
     <h2 className='mt-[60px] text-center text-3xl font-bold'>Admin login</h2>
    <div className='flex text-1xl flex-col font-bold absolute top-[37%] left-[43%] p-[34px] border border-solid bg-slate-700 border-violet-950'>
        <ToastContainer/>
        {error && <p className='text-red-600 font-bold'>{error}</p> }
        <form onSubmit={handleSubmit(onSubmit)} >
            <label>Email :</label> <br/>
            <input type="email" {...register("adminEmail",{ required:"Email is required"})}  className='border border-solid border-black rounded'/> <br/>
            <label>password :</label>  <br/>
            <input type="password" {...register("passWord",{ required:"Password is required"})}  className='border border-solid border-black rounded' /> <br/>
            <button className='cursor-pointer'>submit</button>
        </form>
    </div>
    </div>
  )
}

export default AdminLoginFun
