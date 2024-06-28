import React,{useEffect, useState} from 'react'
import Button from '../../component/Button'
import { Link,useNavigate } from 'react-router-dom'
import {useForm,SubmitHandler} from 'react-hook-form'
import Users from '../../Utils/UserDetailtypes'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { ToastContainer,toast,Bounce,ToastOptions } from 'react-toastify'
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL  //* server runing on this port

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




const SignUp = () => {

    const {register,handleSubmit,formState:{errors}} = useForm({
      resolver : yupResolver(schema)
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [error,setErrors] = useState<string>('')
    

    // * show the error message to the user
    useEffect(()=>{
      for(const key in errors){
        // console.log(`key`,errors[key]["message"])
        // let msg = errors[key].message as string
        if(errors[key]['message']){
          setErrors(errors[key]["message"] as string)
          break;
        }
      }
      if(!Object.keys(errors)?.length){
        setErrors('')
      }
      
    },[Object.keys(errors).length])

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
    // data sent to backend

    const onSubmit: SubmitHandler<Users> = async data => {
      try{
   
        let response : any = await toast.promise(
          axios.post(`${SERVERSIDE_URL}/user/signup`,data),
          {
            pending : "Signing up",
            success : "User registered successfully",
            error : "Failed to signup"
          },
          toastOptions
        );

        if(response.data.message){
          setTimeout(()=>{
            navigate("/logIn")
          },1500)

        }
      }catch(err){
        setErrors("Email already exit")
          console.log('err',err)
      }
    };
  

  return (
    <div>
    <div className='grid grid-cols-1 lg:grid-cols-3 w-[80%] h-[60vh] box-border mx-[10%] my-[20vh] shadow-lg rounded-lg font-sans bg-slate-950'>
      <div className='w-[100%]  h-full grid place-items-center'>
          <div>
            <h2 className='text-5xl font-extrabold pb-3 text-white '>Welcome Back </h2>
           <div>
                <Link to="/logIn">
                    <Button >Sign in</Button>
                </Link>
            </div>
          </div>
      </div>
      <div className='w-full h-full grid place-items-center col-span-2  bg-white  reletive right-0'>
        <div>
            <h2 className='text-3xl font-extrabold text-center pb-3 text-slate-950'>Creat Account</h2>
            
            <div className='grid ml-[1em]'>   
            <ToastContainer />
              {/* {error ? <p>{error}</p>}      */}
              {error && <p className='text-red-600 font-bold'>{error}</p> }
              <form onSubmit={handleSubmit(onSubmit)}>

                <label>Name :</label>
                <input  {...register("userName",{ required:"User Name required"})} type="text" placeholder='User Name' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Email :</label>
                <input {...register("userEmail",{ required:"Email is required"})} type="email" placeholder='User Email' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Phone No :</label>
                <input {...register("mobileNo",{ required:"Mobile number is required",minLength:{value : 10,message:'Enter full number'}})} type="tel" placeholder='User Mobile' minLength={10} className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Password :</label>
                <input {...register("passWord",{ required:"Password is required"})} type="password" placeholder='User Password' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Confirm Password :</label>
                <input  {...register("confirmPassword",{ required:"Confirm Password is required"})} type="password" placeholder='Confirm Password' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <Button>Sign UP</Button>
              </form>

            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
