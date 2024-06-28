import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Users from "../../Utils/UserDetailtypes"

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL

type userData = {
    id : number,
    username : string,
    email : string,
    phone : string
}

const Dashboard = () => {

    const [userDatails,setUserDetails] = useState([])

    useEffect(()=>{

        const fetchData =async ()=>{

            const jwt :string |null= localStorage.getItem('adminJWT')
            const userData = await axios.post(`${SERVERSIDE_URL}/admin/getUserData`,{jwt})
            console.log(userData)
            setUserDetails(userData?.data?.dashboard)
        }
        fetchData()
    },[])

  return (
    <div className='mt-[60px]'>
      <h2 className='text-center text-3xl font-bold'>Admin Dashboard</h2>
      <div className='w-[80%] absolute left-[10%] flex flex-col bg-gray-500'>
        <div className='flex justify-between '>
            <h2>User List</h2>
            <button>Add User</button>
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
                            return <tr className='border border-solid border-stone-950'>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.username}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.email}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'>{data?.phone}</td>
                                    <td className='overflow-hidden whitespace-nowrap text-ellipsis  pt-[1em] pl-[1em]'><button>+</button><button>-</button></td>
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
