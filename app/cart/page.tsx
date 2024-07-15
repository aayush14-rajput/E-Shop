import React from 'react'
import Container from '../Components/Container'
import CartClient from './CartClient'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page =async () => {
  const currentUser= await getCurrentUser()
  return (
    <div className='pt-8'>
    <Container>
      <CartClient currentUser={currentUser}/>
    </Container>
    </div>
  )
}

export default page