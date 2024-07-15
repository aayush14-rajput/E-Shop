"use client"
// renders on the browser and interactive
import React, { useCallback, useState } from 'react'
import { Truncate } from '@/Utils/Truncate'
import Rating from '@mui/material/Rating';
import SetColor from '@/app/Components/Products/SetColor';
import SetQuantity from '@/app/Components/Products/SetQuantity';
import Button from '@/app/Components/Button';
import ProductImage from '@/app/Components/Products/ProductImage';
import { UseCart } from '@/Hooks/UseCart';
import { useRouter } from 'next/navigation';



interface ProductDeatilsProps {
  product: any
}
// for defining type we need = sign
export type CartProductType={  
  id:string,
  name:string,
  description:string,
  category:string,
  brand:string,
  selectedImg:SelectedImgType
  quantity:number,
  price:number

}

export type SelectedImgType={
  color:string,
  colorCode:string,
  image:string
}



const ProductDetails: React.FC<ProductDeatilsProps> = ({ product }) => {
 

const {handleAddProductToCart,cartProducts}=UseCart();


const [cartProduct,setCartProduct]=useState<CartProductType>({
    id:product.id,
    name:product.name,
    description:product.description,
    category:product.category,
    brand:product.brand,
    selectedImg:{...product.images[0]},
    quantity:1,
    price:product.price
  })
  // console.log("hello",cartProduct)
  console.log(cartProduct)

  const router=useRouter()


  const handleColorSelect=useCallback((value:SelectedImgType)=>{
    setCartProduct((prev)=>{
      return{...prev,selectedImg:value};
    })
  },[cartProduct.selectedImg])
  
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
        return { ...prev, quantity: prev.quantity + 1 };
    });
}, []);
 
const handleQtyDecrease = useCallback(() => {
  setCartProduct((prev) => {
      return { ...prev, quantity: Math.max(prev.quantity - 1, 1) };
  });
}, []);
    

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>

      <div>
        <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
      </div>
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{Truncate(product.name)}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={3} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <hr className='w-[30%] my-2' />
        <div className='text-justify'>{product.description}</div>
        <hr className='w-[30%] my-2' />
        <div>
          <span className='font-semibold'>CATEGORY:</span>
          {product.category}
        </div>
        <div>
          <span className='font-semibold'>BRAND:</span>
          {product.brand}
        </div>
        <div className={product.inStock? 'text-teal-400':"text-rose-400"}>{product.inStock?"In Stock":"out of stock"}</div>
        <hr className='w-[30%] my-2' />
      <div className='max-w-[300px]'>
        <Button label='View Cart' outline   onclick={()=>{
          router.push("/cart")
        }}></Button>
      </div>

          <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
       
        <hr className='w-[30%] my-2' />
        <div>
          <SetQuantity cartProduct={cartProduct} handleQtyIncrease={handleQtyIncrease} handleQtyDecrease={handleQtyDecrease}/>
          </div>
        <hr className='w-[30%] my-2' />
        <div className='max-w-[300px]'>
          <Button outline label='Add To Cart'  onclick={()=>handleAddProductToCart(cartProduct)}/>
        </div>


      </div>
    </div>
  )
}

export default ProductDetails