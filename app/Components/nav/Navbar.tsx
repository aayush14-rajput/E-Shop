
import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import CartCount from './CartCount'
import UserMenu from './UserMenu'
import { getCurrentUser } from '@/actions/getCurrentUser'
import Categories from './Categories'
import SearchBar from './SearchBar'


const Navbar = async() => {
  const currentUser=await getCurrentUser()
  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <div className='flex items-center gap-2'>
              <img src="https://e7.pngegg.com/pngimages/267/352/png-clipart-shopping-cart-logo-web-development-e-commerce-business-logo-itech-ecommerce-company-ecommerce-web-design-text-thumbnail.png" alt="logo" className='h-10' />
              <Link href='/' style={{ fontFamily: 'cursive', marginLeft: '0' }}>
                E-Bazzar
              </Link>
            </div>
            <div className='hidden md:block'>
              <SearchBar/>
            </div>
            <div className='flex items-center gap-8 md:gap-12'>
              <CartCount />
              <UserMenu currentUser={currentUser}/>
            </div>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>

  )
}

export default Navbar