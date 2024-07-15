export const revalidate=0;

import React from 'react'

import Container from './Components/Container'
import Banner from './Components/Banner'
import { Products } from '@/Utils/Product'
import { Truncate } from '@/Utils/Truncate'
import ProductCard from './Components/Products/ProductCard'
import getProducts, { IProductParams } from '@/actions/getProducts'
import NullData from './Components/NullData'


interface PageProps{
  searchParams:IProductParams
}

export default async function page({searchParams}:PageProps) {

  const products=await getProducts(searchParams)

  //randomization of the product
  
  if(products.length===0){
    return <NullData title='Oops! No Products found.Click "All" to clear filters'/>
  }

  function shuffleArray(array:any){
    for(let i=array.length -1;i>0;i--){
      const j=Math.floor(Math.random() * (i+1));
      [array[i],array[j]]=[array[j],array[i]]  //shuffle algorithm
    }

    return array
  }

  const shuffledProducts=shuffleArray(products)
  return (
    <div className='p-8'>
     <Container>
      <div>
       <Banner/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {shuffledProducts.map((product:any)=>{
          return(
            <>
            <div>
              <ProductCard data={product} key={product.id}/>
            </div>
           
            </>
          )
        })}
      </div>
     </Container>
    </div>
  )
}



