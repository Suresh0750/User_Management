import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import{Link, useNavigate} from 'react-router-dom'
import { useForm,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'
import Users from '../../Utils/UserDetailtypes'

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL
// schema validation for sinup details
const schema = yup.object().shape({
    userName: yup.string().required('First Name is mandatory'),
    userEmail: yup.string().email('Please enter a valid email').required('Email is mandatory'),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Enter a valid 10-digit mobile number').required('Mobile number is mandatory'),
    passWord: yup.string()
      .required('Password is mandatory')
      .min(6, 'Minimum 6 characters required')
      .max(15, 'Password should be less than 15 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('passWord'), null], 'Passwords must match')
      .required('Confirm Password is mandatory'),
  });

const AddUser = () => {

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

  const onSubmit : SubmitHandler <Users>= async data=>{
    try{
        console.log(data,`Add user`)
      

        const response : any = await toast.promise(
             axios.post(`${SERVERSIDE_URL}/admin/AddUser`,data),
            {
              pending : "Add user",
              success : "Add User successfully",
              error : "Failed to Add User"
            },
            toastOptions
          );
    

        if(response.data.success){
            setTimeout(()=>{
                Navigate("/Dashboard")
              },1500)
        }
    }catch(err :any){
        setErrors('Email already exist')
        console.log(err)
       toast.error('Email already exist', {
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
    <div className='mt-[60px]'>
      <h2 className='text-center text-3xl font-bold'>Add New User</h2>
      <div className='absolute p-[34px] top-[30%] left-[19%] border border-solid border-red-950'>
      {error && <p className='text-red-600 font-bold'>{error}</p> }
        <ToastContainer/>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
            <input type="text" {...register("userName")} placeholder='User Name'/>
            <input type="email" {...register("userEmail")} placeholder='User Email' />
            <input type="tel" minLength={10} maxLength={10} {...register("mobileNo")} placeholder='Mobile Number'/>
            <input type="password" {...register("passWord")} placeholder='Password'/>
            <input type="password" {...register("confirmPassword")} placeholder='Confirm Password'/>
            <div>
                <button>Add</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddUser
