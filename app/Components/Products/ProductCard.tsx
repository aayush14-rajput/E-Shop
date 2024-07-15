"use client"
// we can use the hooks and usestate
import React from 'react'
import Image from 'next/image'
import { Truncate } from '@/Utils/Truncate'
import { Price } from '@/Utils/Price'
import Rating from '@mui/material/Rating';
import { useRouter } from 'next/navigation'

interface ProductCardProps{
    data:any
}

const ProductCard:React.FC<ProductCardProps> = ({data}) => {

  const router = useRouter()

  return (
    <div onClick={() => router.push(`/product/${data.id}`)} className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm '>
        <div className='flex flex-col items-center w-full gap-1'>
            <div className='aspect-square overflow-hidden relative w-full'>
                <Image fill className='w-full h-full object-contain' src={data.images[0].image} alt={data.name}/>
            </div>
            <div className='mt-4 '>
              {Truncate(data.name)}
            </div>
            <div>
              <Rating value={3} readOnly/>
            </div>
            <div>{data.reviews.length} reviews</div>
            <div className='font-semibold'>{Price(data.price)}</div>
        </div>
    </div>
  )
}

export default ProductCard