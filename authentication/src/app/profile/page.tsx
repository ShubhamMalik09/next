'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const ProfilePage = () => {
    const router= useRouter();
    const [data,setData] = useState("");

    useEffect(()=>{
        const getUserDetails = async()=>{
            const res= await axios.post('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        }
        getUserDetails();
    },[]);

    const logout = async() =>{
        try{
            await axios.get('/api/users/logout');
            toast.success("logout success");
            router.push('/logout');
        } catch(error:any){
            console.log(error.message);
            toast.error(error.message);
        }
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <hr />

      <h2>{data==="" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />

      <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
    </div>
  )
}

export default ProfilePage
