"use client"
import { UseCart } from '@/Hooks/UseCart'
import { Price } from '@/Utils/Price'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Heading from '../Components/Heading'
import Button from '../Components/Button'

interface CheckoutFormProps {
    clientSecret: string,
    handleSetPaymentSuccess: (Value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, handleSetPaymentSuccess }) => {

    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = UseCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = Price(cartTotalAmount)

    useEffect(() => {
        if (!stripe || !clientSecret) {
            return;
        }

        handleSetPaymentSuccess(false)
    }, [stripe, clientSecret, handleSetPaymentSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.href
            },
            redirect: 'if_required'
        });

        if (!error) {
            toast.success("Checkout success");

            handleClearCart();
            handleSetPaymentSuccess(true);
            handleSetPaymentIntent(null);  //resets the local storage and state
        } else {
            toast.error(`Payment failed: ${error.message}`);
        }

        setIsLoading(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} id='payment-form'>

                <div className='mb-6'>
                    <Heading title='Enter Your details to complete checkout' />
                </div>
                <h2 className='font-semibold mb-2'>Address Information</h2>
                <AddressElement options={{
                    mode: 'shipping',
                    allowedCountries: ['US', 'KE', 'IN']
                }} />
                <h2 className='font-semibold mt-4 mb-2'>Payment Information</h2>
                <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

                <div className='py-4 text-center text-slate-700 text-xl font-bold'>
                    Total: {formattedPrice}
                </div>
                <Button label={isLoading ? 'Processing' : 'Pay now'} disabled={isLoading || !stripe || !elements} onclick={()=>{}}/>

            </form>
        </div>
    )
}

export default CheckoutForm
