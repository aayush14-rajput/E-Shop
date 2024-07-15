"use client"
import React, { useEffect, useState } from 'react'
import Heading from '../Components/Heading'
import Input from '../Components/inputs/Input'

import Link from 'next/link'

import Button from '../Components/Button'
import { FaGoogle } from "react-icons/fa";
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {toast} from 'react-hot-toast'
import { safeUser } from '@/types'


interface LoginFormProps{
    currentUser:safeUser | null
}


const LoginForm:React.FC<LoginFormProps> = ({currentUser}) => {


    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const router=useRouter();

    useEffect(()=>{
    if(currentUser){
        router.push('/cart')
        router.refresh()
    }
    },[])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)

            if (callback?.ok) {
                router.push('/')
                router.refresh();
                toast.success('Logged In')
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })

    }

    if(currentUser){
        return <p className='text-center'>Logged in. Redirecting...</p>
    }


    return (
        <div className="flex flex-col items-center justify-center">
            <Heading title='Sign in to E-shop' />

            <Button outline label='Continue with Google' icon={FaGoogle} onclick={() =>{signIn('google')}} />
            <hr className='bg-slate-300 w-full h-px' />

            <hr className='bg-slate-300 w-full h-px mt-3' />


            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />

            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required type='password' />



            <Button label={isLoading ? "Loading" : 'Login'} onclick={handleSubmit(onSubmit)} />



            <p className='text-sm mt-4'>
                Do not Have an Account
                <Link className='underline' href='/Register'>
                    Signup
                </Link>
            </p>


        </div>
    )
}

export default LoginForm

