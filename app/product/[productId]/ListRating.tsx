"use client"
import React from 'react'
import Heading from '@/app/Components/Heading'
import moment from 'moment'
import { Rating } from '@mui/material'
import Avatar from '@/app/Components/Avatar'

interface ListRatingProps {
    product: any
}
const ListRating: React.FC<ListRatingProps> = ({ product }) => {
    return (
        <div>
            <Heading title='Product Review' />
            <div className='text-sm mt-2'>{product.reviews && product.reviews.map((review: any) => {
                return (
                    <>
                        <div key={review.id} className='max-w-[300px]'>
                            <div className='flex gap-2'>
                                <div>
                                 <Avatar src={review?.user.image}/>
                                </div>
                                <div className='font-semibold'>{review?.user.name}</div>
                                <div>{moment(review.createddate).fromNow()}</div>

                            </div>
                            <div className='mt-2'>
                                <Rating value={review.rating} readOnly/>
                                <div className='ml-2'>{review.comment}
                                    <hr  className='mt-4
                                    mb-4'/>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}</div>
        </div>
    )
}

export default ListRating