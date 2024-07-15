"use Client"
import React from 'react'
import { CartContextProvider } from '@/Hooks/UseCart'
interface CartProviderProps{
    children:React.ReactNode
}

const CartProvider:React.FC<CartProviderProps> = ({children}) => {
  return (
    <div>
    <CartContextProvider>{children}</CartContextProvider>
    </div>
  )
}

export default CartProvider