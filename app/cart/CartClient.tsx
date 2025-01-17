"use client"
import { UseCart } from '@/Hooks/UseCart'
import Link from 'next/link'
import React from 'react'
import { IoMdArrowBack } from "react-icons/io"
import Heading from '../Components/Heading'
import Button from '../Components/Button'
import ItemContent from './ItemContent'
import { Price } from '@/Utils/Price'
import { safeUser } from '@/types'
import { useRouter } from 'next/navigation'


interface CartClientProps{
    currentUser:safeUser | null
}

const CartClient:React.FC<CartClientProps> = ({currentUser}) => {
    const { cartProducts,handleClearCart,cartTotalAmount } = UseCart()

    const router=useRouter()
    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className='flex flex-col items-center'>
                <div className='text-2xl'>Your Card is empty</div>
                <div>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <IoMdArrowBack />
                        <span>Start Shopping</span>
                    </Link>
                </div>

            </div>

        )
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8'>
                <div className='col-span-2 justify-self-start'>PRODUCT</div>
                <div className='justify-self-center'>PRICE</div>
                <div className='justify-self-center'>QUANTITY</div>
                <div className='justify-self-end'>TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return (
                        <>
<ItemContent key={item.id} item={item}/>
                        </>
                    )
                        
                })}
            </div>
            <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
                <div className='w-[70px]'>
                    <Button label='Clear Cart' onclick={() => handleClearCart()} small outline />
                </div>
                <div className='text-sm flex flex-col gap-1 items-start'>

                    <div className='flex justify-between w-full text-base font-semibold'>
                        <span>Subtotal</span>
                        <span>{Price(cartTotalAmount)}</span>
                    </div>

                    <p className='text-slate-500'>Taxes and Shipping Calculate at Checkout</p>
                    <Button label={currentUser?'Checkout' : 'Login To Checkout'} onclick={() => {currentUser?router.push('/checkout'):router.push('/login')}} small outline={currentUser?false:true}/>
                    <Link href={"/"} className='text-slate-500 flex items-center gap-1 mt-2'>
                        <IoMdArrowBack />
                        <span>Continue Shopping</span>
                    </Link>

                </div>
            </div>



        </div>
    )
}

export default CartClient