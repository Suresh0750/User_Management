import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Button from '../../component/Button.jsx'
import {useForm, SubmitHandler} from 'react-hook-form'
import{Link, useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Users from '../../Utils/UserDetailtypes.js'
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { loginUser } from '../../slice/UserSlice.js'

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL
// * valdition schema
const schema = yup.object().shape({
  userEmail: yup.string().email('Please enter a valid email').required('Email is mandatory'),
  passWord: yup.string()
  .required('Password is mandatory')
  .min(6, 'Minimum 6 characters required')
  .max(15, 'Password should be less than 15 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
})



const Loginpage = () => {

  
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver : yupResolver(schema)
  })


  // * updating redux
  const dispatch = useDispatch()
  const Navigate = useNavigate() // * navigate to another page

  // * use pick in login data 
  type loginData = Pick<Users, "userEmail" | "passWord">

  // * show the input error
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

  const onSubmit : SubmitHandler<loginData> = async data=>{
    try{
      let response : any = await toast.promise(
        axios.post(`${SERVERSIDE_URL}/user/login`,data),
        {
          pending : "Login",
          success : "User login successfully",
          error : "Failed to login"
        },
        toastOptions
      );

      console.log("response",response)
      console.log("response",response.data)

      if(response?.data?.success){

        localStorage.setItem("userJWT",response.data.token)
        dispatch(loginUser())

        setTimeout(()=>{
          Navigate("/profile")
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
    <div className='grid grid-cols-1 lg:grid-cols-3 w-[80%] h-[60vh] box-border mx-[10%] my-[20vh] shadow-lg rounded-lg font-sans bg-white'>
      <div className='w-[100%] col-span-2  h-full grid place-items-center'>
          <div>
            <h2 className='text-5xl font-extrabold pb-3 text-slate-900 '>Login to Your Account </h2>
            <ToastContainer />
            <div className='grid '>
            {error && <p className='text-red-600 font-bold'>{error}</p> }
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder='Email' {...register("userEmail",{ required:"Email is required"})} className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <input type="password" placeholder='Password' {...register("passWord",{ required:"Password is required"})} className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <Button>Sign In</Button>
              </form>
            </div>
          </div>
      </div>
      <div className='w-full h-full grid place-items-center bg-slate-950 reletive right-0'>
        <div>
            <h2 className='text-3xl font-extrabold pb-3 text-white'>New Here?</h2>
            <div>
                <Link to="/signUp">
                <Button>Sign Up</Button>
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage
