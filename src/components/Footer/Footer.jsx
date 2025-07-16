import React, { useState } from 'react'
import style from './Footer.module.css'
import img1 from '../../assets/Amazon_Pay_logo.svg.png'
import img2 from '../../assets/PayPal-Logo.jpg'
import img3 from '../../assets/American_Express_logo_(2018).svg.png'
import img4 from '../../assets/Google Play.png'
import img5 from '../../assets/App Store - Filled.png'

export default function Footer() {

    const [counter, setcounter] = useState(null)
  return <>
  <footer className='h-96 bg-slate-300 dark:bg-gray-900 dark:text-white py-3'>
         <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <h3 className='text-2xl'>Get The FreshCart app</h3>
         <p className='text-gray-600'>We will send you a link , open it on your phone yo download the app</p>
         <div className="flex items-center gap-6 my-5 border-b-[1px] border-gray-400 pb-6 ">
           <div className='w-[60%]'>
              
               <input type="text" id="small-input" placeholder='Email...' className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
           </div>
           <div className='w-[40%]'>
           
           <button className='bg-green-600 px-4 py-3 rounded-md  text-white cursor-pointer  '> Share App Link </button>
           
           </div>
         </div>
         <div className="md:flex justify-between ">
           <div className="flex items-center gap-4 pb-4">
            <p className='text-xl'>Payment Partener</p>
           <img src={img1} className='w-18 pt-2 object-cover' alt="" />
           <img src={img2} className='w-18  object-cover' alt="" />
           <img src={img3} className='w-18  h-8 object-cover' alt="" />
           </div>
           <div className='flex items-center gap-4 '>
               <h3 className='text-xl'> Get deliveries with FreshCart</h3>
                 <img src={img4} className=' object-cover' alt="" />
                 <img src={img5} className=' object-cover' alt="" />

           </div>
         </div>
         </div>
  </footer>
  
  
  
  
  
  
  </>
}
