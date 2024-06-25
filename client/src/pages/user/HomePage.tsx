import React from 'react'
import Button from '../../component/Button'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='w-[58%] h-[30%] absolute flex items-center bg-[#d0eaf2] justify-center px-2 top-[11.25rem] left-[18.25rem] flex-col border border-none  text-[#232329] border-red-700 gap-1 box-border rounded-lg shadow-lg font-sans'>
      <h2 className='font-bold text-[#2c2216] drop-shadow-lg text-3xl'>MERN CLEANSE</h2>
      <p>MERN Cleanse is a comprehensive project built on MongoDB, Express, React, Node js (MERN). It serves as a boilerplate for MERN  Authenication, featuring JWT storage in HTTP Only cookies for enhanced security. Leveraging Redux toolkit and the react Bootstrap library. It offers robust fuctionality for stremlined</p>
      <div className='pt-2 text-white'>
        <button className='pt-2 py-2 px-4 border  bg-[#4280bd] mr-2 rounded'>
            <Link to="/login">
                Sign In
            </Link>
        </button>
        <button  className='pt-2 py-2 px-4 border bg-[#4280bd] rounded'>
            <Link to="/signUp">
            Sign Up
            </Link>
        </button>
      </div>
    </div>
  )
}

export default HomePage
