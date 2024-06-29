import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import{useLocation, useNavigate} from 'react-router-dom'
import { useForm,SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'
import Users from '../../Utils/UserDetailtypes'

type Input =  {
    id : number,
    email : string, 
    mobile : string,
    usename : string
}


const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL
// schema validation for sinup details
const schema = yup.object().shape({
    userName: yup.string().required('First Name is mandatory'),
    userEmail: yup.string().email('Please enter a valid email').required('Email is mandatory'),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Enter a valid 10-digit mobile number').required('Mobile number is mandatory'),
    // passWord: yup.string().required('Password is mandatory').min(6, 'Minimum 6 characters required').max(15, 'Password should be less than 15 characters').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    // confirmPassword: yup.string().oneOf([yup.ref('passWord'), null], 'Passwords must match').required('Confirm Password is mandatory'),
  });


const AdminEdit = () => {
    const {register,setValue,handleSubmit,formState:{errors}} = useForm({
        resolver : yupResolver(schema)
      })


     // * show the input error
  const [error,setErrors] = useState<string>('')
  const Navigate = useNavigate()  
  const dispatch = useDispatch()
  const location = useLocation()

//   const{id,email,usename,phone} = location.state 
  const userEdit = location.state || {}
      console.log(`location`,location.state)
      console.log(userEdit)
    useEffect(()=>{
        setValue("userName",userEdit. username);
        setValue("userEmail", userEdit.email);
        setValue("mobileNo", userEdit.phone);
    },[])

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

  const onSubmit: SubmitHandler<Input> = async data => {
    try{
 
      let response : any = await toast.promise(
        axios.patch(`${SERVERSIDE_URL}/admin/editData`,{data,id:userEdit?.id}),
        {
          pending : "Edite User Data",
          success : "User Detail edit successfully",
          error : "Failed to save update"
        },
        toastOptions
      );

      if(response.data.success){
        setTimeout(()=>{
            Navigate("/Dashboard")
        },1500)
      }
    }catch(err){
      setErrors("Email already exit")
        console.log('err',err)
    }
  };
  return (
    <div className='mt-[60px]'>
      <h2 className='text-center text-3xl font-bold'>Edit User</h2>
      <div className='absolute p-[34px] top-[30%] left-[19%] border border-solid border-red-950'>
      {error && <p className='text-red-600 font-bold'>{error}</p> }
        <ToastContainer/>
        <form onSubmit={handleSubmit(onSubmit)} className='flex gap-2'>
            <input type="text" {...register("userName")} placeholder='User Name'/>
            <input type="email" {...register("userEmail")} placeholder='User Email' />
            <input type="tel" minLength={10} maxLength={10} {...register("mobileNo")} placeholder='Mobile Number'/>
            {/* <input type="password" {...register("passWord")} placeholder='Password'/>
            <input type="password" {...register("confirmPassword")} placeholder='Confirm Password'/> */}
            <div>
                <button>save</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AdminEdit
