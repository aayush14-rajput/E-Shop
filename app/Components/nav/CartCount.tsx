"use client"
import { UseCart } from '@/Hooks/UseCart'
import { useRouter } from 'next/navigation'
import { FaShoppingCart } from "react-icons/fa";
import React from 'react'

const CartCount = () => {
    const{cartTotalQty}=UseCart()
    const router=useRouter()
  return (
    <div className='relative cursor-pointer' onClick={()=>router.push('/cart')}>
        <div className='text-3xl'>
        <FaShoppingCart />
        </div>
        <span className='absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm'>{cartTotalQty}</span>

    </div>
  )
}

export default CartCount