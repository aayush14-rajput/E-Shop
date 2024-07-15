// server side component
import React from 'react'
import Container from '../Components/Container'
import Form from '../Components/Form'
import RegisterForm from './RegisterForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async() => {
  const currentUser=await getCurrentUser()
  return (
    <div>
     <Container>
        <Form>
          <RegisterForm currentUser={currentUser}/>
        </Form>
     </Container>
    </div>
  )
}

export default page