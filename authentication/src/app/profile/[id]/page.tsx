'use client'

import React from 'react'

const page = ({params}:any) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <h2 className='p-3 bg-green-500 rounded text'>{params.id}</h2>
    </div>
  )
}

export default page
