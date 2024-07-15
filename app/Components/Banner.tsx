"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

const Banner = () => {
    const heroImages = [
        { imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch' },
        { imgUrl: '/assets/images/hero-3.svg', alt: 'lamp' },
        { imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer' },
        { imgUrl: '/assets/images/laptop2.webp', alt: 'laptop' },
       
    ]
    return (
        <div className='hero-carousel'>
            <Carousel showThumbs={false}
                // autoPlay
                infiniteLoop
                // interval={200}
                showArrows={true}
                showStatus={false}>
                {
                    heroImages.map((image) => (
                        <Image src={image.imgUrl} alt={image.alt} width={150} height={150} className='object-contain' key={image.alt} />
                    ))
                }
            </Carousel>
            <Image src="/assets/icons/hand-drawn-arrow.svg" alt='arrow' width={150} height={150} className='max-xl:hidden absolute -left-[15%] bottom-0' />
        </div>
    )
}

export default Banner
