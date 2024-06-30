
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {ToastContainer, toast,Bounce,ToastOptions } from 'react-toastify'
import Users from '../../Utils/UserDetailtypes'

const SERVERSIDE_URL = import.meta.env.VITE_SERVERSIDE_URL  //* server runing on this port

const defaultImage  = 'blank-user-icon-image.jpg'

const ProfilePage = () => {

  type userDetail = Omit<Users,'passWord'>
  const [userData,setUserData] = useState<userDetail | string>('')  // * store backend user data and show to user

  const [image,setImage] = useState(null)


  const imageHandler = (e:any)=>{

    setImage([...e.currentTarget.files][0])

  }
  
  useEffect( ()=>{

    async function fetchData(){

      const jwt : (string | null)= localStorage.getItem("userJWT")
      let response  =await axios.post(`${SERVERSIDE_URL}/user/fetchUserData`,{jwt})
    //   userName: string;
    // userEmail: string;
    // mobileNo: string;
    console.log('check image',response)
      setUserData({
        userName :response.data.row.username,
        userEmail : response.data.row.email,
        mobileNo : response.data.row.phone,
        image : response.data.row.image
      })
    }
    fetchData()
  },[])

  async function uploadedImage(e:any){
      e.preventDefault()

      const formData = new FormData(e.currentTarget);
      const jwt : string | null = localStorage.getItem("userJWT")

      if (jwt) {
        formData.append("userJWT", jwt);
      }

    
      console.log('uploadImage')
      const response = await axios.post(`${SERVERSIDE_URL}/user/uploadImage`,formData,{ headers: {
        'Content-Type': 'multipart/form-data',
      }})

      console.log(response)
  }
  return (
    <>
    <div className='mt-[60px]'>
      <h2 className='text-center text-3xl font-bold'>Welcome to User </h2>
    </div>
    <div className='w-[58%] h-[30%] absolute flex items-center bg-[#d0eaf2] justify-center px-2 top-[11.25rem] left-[18.25rem] flex-row border border-none  text-[#232329] border-red-700 gap-1 box-border rounded-lg shadow-lg font-sans'>
        <div className='w-[50%] flex flex-col'>
          <div>
            <form onSubmit={uploadedImage} encType='multipart/form-data'>
              <img src={image ? URL.createObjectURL(image) : userData?.image ? `${SERVERSIDE_URL}/images/${userData.image}` : `${SERVERSIDE_URL}/images/${defaultImage}`} alt={""} width="160px" height="160px" />
              <input type="file" name="image"  accept='image/*'  onChange={imageHandler}/>
              <input type="submit" className='cursor-pointer' value={"upload"}/>
            </form>
          </div>
        </div>
        <div className='w-[50%] font-bold'>
            <h2>Name : {userData?.userName}</h2>
            <h2>Email : {userData?.userEmail}</h2>
            <h2>mobileNo : {userData?.mobileNo}</h2>
        </div>

    </div>
    </>
  )
}

export default ProfilePage
