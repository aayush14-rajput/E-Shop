// import React from 'react'
// import Container from '@/app/Components/Container'
// import Form from '@/app/Components/Form'
// import AddProductForm from './AddProductForm'
// import { getCurrentUser } from '@/actions/getCurrentUser'
// import NullData from '@/app/Components/NullData'

// const AddProducts = async() => {
//   const currentUser=await getCurrentUser()

//   if(!currentUser || currentUser.role !== 'ADMIN'){
//     return <NullData title='Oops Access Denied'/>
//   }
//   return (
//     <div className='p-8'>
//    <Container>
//     <Form>
//       <AddProductForm/>
        
     
//     </Form>
//    </Container>
//     </div>
//   )
// }

// export default AddProducts

import React from 'react'
import dynamic from 'next/dynamic'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Container = dynamic(() => import('@/app/Components/Container'))
const Form = dynamic(() => import('@/app/Components/Form'))
const AddProductForm = dynamic(() => import('./AddProductForm'))
const NullData = dynamic(() => import('@/app/Components/NullData'))

const AddProducts = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title='Oops Access Denied' />
  }
  return (
    <div className='p-8'>
      <Container>
        <Form>
          <AddProductForm />
        </Form>
      </Container>
    </div>
  )
}

export default AddProducts
