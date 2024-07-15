import React from 'react'
import Container from '../Components/Container'
import Form from '../Components/Form'
import LoginForm from './LoginForm'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async() => {
  const currentUser=await getCurrentUser()
  return (
    <div>
        <Container>
            <Form>
               <LoginForm currentUser={currentUser}/>
            </Form>
        </Container>
    </div>
  )
}

export default page