import { useState } from 'react'

import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brand from './components/Brand/Brand'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import AuthContextProvider from './components/AuthContextProvider/AuthContextProvider'
import Category from './components/Category/Category'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import DetailsProducts from './components/DetailsProducts/DetailsProducts'
import CartContextProvider from './components/CartContextProvider/CartContextProvider'
import { Toaster } from 'react-hot-toast'
import Payment from './components/Payment/Payment'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import SpeceficCategory from './components/SpeceficCategory/SpeceficCategory'
import ThemeContextProvider from './components/ThemeContextProvider/ThemeContextProvider'
import AllOrders from './components/allOrders/AllOrders'
import WhishList from './components/WhishList/WhishList'
import WishListContextProvider from './components/WishListContextProvider/WishListContextProvider'
 
const query = new QueryClient();

function App() {

  
  let router = createHashRouter([
    {path:'/' , element:<Layout/> , children:[
       {index:true , element:<ProtectedRoute><Home/></ProtectedRoute>} ,
       {path:'login' , element:<Login/>}  ,
      {path:'register' , element:<Register/>}  ,
      {path:'Brand' , element:<ProtectedRoute><Brand/></ProtectedRoute>} ,
      {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>} ,
      {path:'detailsproduct/:id/:category' , element:<ProtectedRoute><DetailsProducts/></ProtectedRoute>} ,
      {path:'categories' , element:<ProtectedRoute><Category/></ProtectedRoute>} ,
      {path:'SpeceficCategory/:id' , element:<ProtectedRoute><SpeceficCategory/></ProtectedRoute>} ,
      {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>} ,
      {path:'wishlist' , element:<ProtectedRoute><WhishList/></ProtectedRoute>} ,
      {path:'payment' , element:<ProtectedRoute><Payment/></ProtectedRoute>} ,
      {path:'allorder' , element:<ProtectedRoute><AllOrders/></ProtectedRoute>} ,
      {path:'forgetpassword' , element:<ForgetPassword/>} ,
      {path:'verifycode' , element:<VerifyCode/>}  ,
      {path:'resetpassword' , element:<ResetPassword/>}  

    ]} 
  ])
  return (
    <>
     
     <ThemeContextProvider>

    <AuthContextProvider >
      <CartContextProvider>
      <WishListContextProvider>
        <QueryClientProvider client={query}>
          <Toaster />
          <RouterProvider router={router}/>
          <ReactQueryDevtools/>

        </QueryClientProvider>


      </WishListContextProvider>
      </CartContextProvider>

    
    </AuthContextProvider>

     </ThemeContextProvider>

     




    </>
  )
}

export default App
