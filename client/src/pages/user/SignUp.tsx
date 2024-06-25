import React,{useState} from 'react'
import Button from '../../component/Button'
import { Link } from 'react-router-dom'




const SignUp = () => {

    const [userDetails,setUserDetail] = useState({
        
    })


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
            <h2 className='text-3xl font-extrabold pb-3 text-white'>Creat Account</h2>
            
            <div className='grid '>
                <label>Name :</label>
                <input name='userName' type="email" placeholder='Email' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Email :</label>
                <input name='userEmail' type="email" placeholder='Email' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Phone No :</label>
                <input name='mobileNo' type="password" placeholder='Password' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Password :</label>
                <input name='passWord' type="email" placeholder='Email' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <label>Confirm Password :</label>
                <input name='confirmPassword' type="password" placeholder='Password' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />

                <Button>Sign UP</Button>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
