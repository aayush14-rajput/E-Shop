"use client"
import React from 'react'
import { CartProductType } from '../product/[productId]/ProductDetails'
import { Price } from '@/Utils/Price'
import Link from 'next/link'
import { Truncate } from '@/Utils/Truncate'
import Image from 'next/image'
import SetQuantity from '../Components/Products/SetQuantity'
import { UseCart } from '@/Hooks/UseCart'
interface itemContentProps {
    item: CartProductType
}


const ItemContent: React.FC<itemContentProps> = ({ item }) => {
    const {handleRemoveProductCart,handleCartQtyIncrease,handleCartQtyDecrease}=UseCart()
    return (
        <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center'>

            <div className='col-span-2 justify-self-start flex gap-2 md:gap-4'>
                <Link href={`/product/${item.id}`}>
                    <div className='relative w-[70px] aspect-square'>
                     <Image src={item.selectedImg.image} alt={item.name} fill className='object-contain'/>
                    </div>
                </Link>
                <div className='flex flex-col justify-between'>
                    <Link href={`/product/${item.id}`}>{Truncate(item.name)}</Link>
                    <div>{item.selectedImg.color}</div>
                    <div className='w-[70px]'>
                        <button className='text-slate-500 underline' onClick={()=>handleRemoveProductCart(item)}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
            <div className='justify-self-center'>{Price(item.price)}</div>
            <div className='justify-self-center'>
                <SetQuantity cartCounter={true}
                cartProduct={item} handleQtyIncrease={()=>handleCartQtyIncrease(item)} 
                handleQtyDecrease={()=>handleCartQtyDecrease(item)}/>
            </div>
            <div className='justify-self-center'>
                {Price(item.price*item.quantity)}
            </div>



        </div>
    )
}

export default ItemContent
