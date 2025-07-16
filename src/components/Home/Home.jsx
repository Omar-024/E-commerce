import React, { useState } from 'react'
import style from './Home.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  let onsale= "fcd"

    const [counter, setcounter] = useState(null)
  return <>
  <MainSlider/>
  <div className='my-12' >
  <CategorySlider/>
  </div>
  <DisplayProducts/>
  
  
  
  
  
  
  </>
}
