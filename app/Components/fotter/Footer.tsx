import React from 'react'
import Container from '../Container'
import FooterList from './FooterList'
import Link from 'next/link'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Shop Categories</h3>
            <Link href='#'>Phones</Link>
            <Link href='#'>Laptops</Link>
            <Link href='#'>Desktops</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>Tv</Link>
            <Link href='#'>Accesories</Link>
          </FooterList>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Customer Services</h3>
            <Link href='#'>Contact Us</Link>
            <Link href='#'>Shipping Policy</Link>
            <Link href='#'>Returns & Exchanges</Link>
            <Link href='#'>Watches</Link>
            <Link href='#'>FAQs</Link>
          </FooterList>
          <div className='w-full md:w-1/3 mb-6 md:mb-0'>
            <h3 className='text-base font-bold mb-2'>About Us</h3>
            <p className='mb-2'>Welcome to E-Bazzar, your one-stop destination for the latest and greatest in electronic gadgets and accessories. Established in [1998], E-Bazzar has grown from a small local shop to a trusted online retailer, serving tech enthusiasts and casual shoppers alike.</p>

          </div>
          <FooterList>
            <h3 className='text-base font-bold mb-2'>Follow Us</h3>
            <div className='flex gap-2'>
            <Link href='#'>
            <FaFacebookF size={24}/>
            </Link>
            <Link href='#'>
            <FaTwitter size={24} />
            </Link>
            <Link href='#'>
            <FaInstagramSquare size={24}/>
            </Link>
            <Link href='#'>
            <FaYoutube size={24} />
            </Link>

            </div>
          </FooterList>


        </div>
      </Container>
    </footer>
  )
}

export default Footer