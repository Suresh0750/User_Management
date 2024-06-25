import React from 'react'

import './Buttom_module.css'

type btn = {
    children : JSX.Element | string
}
const Button = ({children}:btn) =>{
  return (
    <>
      {/* <button className='font-sans text-bold text-base'></button> */}
      <div className='text-center'>
        <button className="btn-17">
          <span className="text-container">
            <span className="text ">{children}</span>
          </span>
        </button>
      </div>
    </>
  )
}

export default Button
