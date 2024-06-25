import React from 'react'

import Button from '../../component/Button.jsx'
import{Link} from 'react-router-dom'

const Loginpage = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 w-[80%] h-[60vh] box-border mx-[10%] my-[20vh] shadow-lg rounded-lg font-sans bg-white'>
      <div className='w-[100%] col-span-2  h-full grid place-items-center'>
          <div>
            <h2 className='text-5xl font-extrabold pb-3 text-slate-900 '>Login to Your Account </h2>
            <div className='grid '>
                <input type="email" placeholder='Email' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <input type="password" placeholder='Password' className='border text-black font-serif font-bold border-none  w-[98%] mb-[18px] p-2 rounded-[6px] bg-green-100 ' />
                <Button>Sign In</Button>
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
