import React from 'react'
import Container from '@/app/Components/Container';
import ProductDetails from './ProductDetails';
import ListRating from './ListRating';
import { Products } from '@/Utils/Product';
import getProductById from '@/actions/getProductById';
import NullData from '@/app/Components/NullData';

interface Iprams {
  productId?: string;
}

const Product = async({ params }: { params: Iprams }) => {

  const fetchProduct=await getProductById(params)

  if(!fetchProduct) return <NullData title='Oops! Product with the given id does not exist'/>
 
  // console.log("params",params)
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={fetchProduct} />
        <div>
          <div className=''>Add Rating</div>
          <div>
            <ListRating product={fetchProduct}/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Product