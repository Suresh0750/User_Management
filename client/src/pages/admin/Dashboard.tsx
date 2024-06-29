import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Users from "../../Utils/UserDetailtypes"
import { useNavigate } from 'react-router-dom'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { asyncThunkCreator } from '@reduxjs/toolkit';
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL

type userData = {
    id : number,
    username : string,
    email : string,
    phone : string
}

const Dashboard = () => {

    const [userDatails,setUserDetails] = useState([])
    const Navigate = useNavigate()

    useEffect(()=>{

        const fetchData =async ()=>{

            const jwt :string |null= localStorage.getItem('adminJWT')
            const userData = await axios.post(`${SERVERSIDE_URL}/admin/getUserData`,{jwt})
            console.log(userData)
            setUserDetails(userData?.data?.dashboard)
        }
        fetchData()
    },[])

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
   

    const handleDelete = async (id:string)=>{
        try{
            console.log(`${SERVERSIDE_URL}/admin/deleteData${id}`)
            let res = confirm("Do you want to delete ?")
            if(!res) return
            let response : any = await toast.promise(
              axios.post(`${SERVERSIDE_URL}/admin/deleteData`,{id}),
              {
                pending : "Delete",
                success : "Delete user Details successfully",
                error : "Failed to Delete User Detail"
              },
              toastOptions
            );
      
            console.log("response",response)
            console.log("response",response.data)
      
            if(response?.data?.success){}
      
            toast('Delted User added successfully', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
            setTimeout(()=>window.location.reload(),3000)
          }catch(err:any){
            
            console.log(err);
      
          }
    }

  return (
    <div className='mt-[60px]'>
      <h2 className='text-center text-3xl font-bold'>Admin Dashboard</h2>
      <div className='w-[80%] absolute left-[10%] flex flex-col bg-gray-500'>
        <div className='flex justify-between '>
            <h2>User List</h2>
            <button onClick={()=>Navigate("/addUser")}>
                Add User
            </button>
        </div>
        <input type="text" />
        <div className='w-full'>
            <table  className='w-full border border-solid  border-stone-950 rounded-[15px]'>
                <thead>
                    <tr>
                        <th className='text-start text-ellipsis pt-[1em] pl-[1em]'>USERNAME</th>
                        <th className='text-start text-ellipsis pt-[1em] pl-[1em]'>EMAIL</th>
                        <th className='text-start text-ellipsis pt-[1em] pl-[1em]'>PROFILE PICTURE</th>
                        <th className='text-start text-ellipsis pt-[1em] pl-[1em]'>ACTION</th>
                    </tr>
                </thead>
                <tbody className='border border-solid border-stone-950'>
                    {userDatails.map((data:userData)=>{
                            return <tr key={data.id} className='border border-solid border-stone-950'>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.username}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.email}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.phone}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>
                                        <button onClick={()=>Navigate('/editUser',{state:data})}><FaEdit /></button>
                                        <button onClick={()=>handleDelete(data.email)}><MdDeleteForever /></button>
                                    </td>
                    </tr>
                    })}
                </tbody>
            </table>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
