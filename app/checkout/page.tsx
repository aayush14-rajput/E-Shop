import React from 'react'
import Container from '../Components/Container'
import Form from '../Components/Form'
import CheckoutClient from './CheckoutClient'

const Checkout = () => {
  return (
    <div className='p-8'>
        <Container>
            <Form>
                <CheckoutClient/>
            </Form>
        </Container>
    </div>
  )
}

export default Checkout