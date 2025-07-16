import React, { useState } from 'react'
import style from './Brand.module.css'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'

export default function Brand() {

  const getBrand = async ()=>{
   return  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`) 
  }
   let {data , isLoading , Error , isError} =  useQuery({
     queryKey:["Brands"]  ,
     queryFn: getBrand,
     refetchInterval:3000 ,
     staleTime:2000 ,
     select: (data)=>data.data.data ,
     refetchOnWindowFocus:true // لازم الداتا تكو ن stale
  })
  console.log(data);

  if(isLoading)
  {
    return <div className='h-screen flex justify-center items-center'><BeatLoader color="rgb(51, 255, 128)" /></div>
  }
  

    
  return <>
  <h1 className='text-4xl text-green-500 text-center my-4'>All Brands</h1>

  <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 md:grid-cols-2 ">
    {data?.map((Brand , index)=>
    <div key={index}>
      <div className='card shadow hover:shadow-2xl scale-90 transition-all duration-300  '>
        <img src={Brand.image} alt="" />
      </div>
      



    </div>)}

  </div>
  
  
  
  
  
  
  </>
}
