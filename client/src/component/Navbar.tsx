import React from 'react'
import { TbLogin2 } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";
import { SiReactivex } from "react-icons/si";

const Navbar = () => {
  return (
    <div className=' flex items-center justify-between w-[100%] h-[60px] bg-slate-700 absolute top-0 z-10'>
      <div >
        <h2 className='text-yellow-600 font-bold ml-[8rem] inline'>MERN Clanse</h2>     <SiReactivex className='inline text-white'/>
      </div>
      <div className='flex items-center justify-between gap-1 text-yellow-600 mr-[5rem] text-zinc-600'>
        <TbLogin2 />
        sign
        <TbLogout2 />
        sign out
      </div>
    </div>
  )
}

export default Navbar
