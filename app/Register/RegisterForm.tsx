"use client"
import React, { useEffect, useState } from 'react'
import Heading from '../Components/Heading'
import Input from '../Components/inputs/Input'

import Link from 'next/link'

import Button from '../Components/Button'
import { FaGoogle } from "react-icons/fa";
import axios from 'axios'
import { signIn } from 'next-auth/react'
import {FieldValues, useForm,SubmitHandler} from 'react-hook-form'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { safeUser } from '@/types'


interface RegisterFormProps{
    currentUser:safeUser | null
}

const RegisterForm:React.FC<RegisterFormProps> = ({currentUser}) => {
    

   const[isLoading,setIsLoading]=useState(false)
   const{register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
        name:'',
        email:'',
        password:''
    }
   });

   const router=useRouter()

   useEffect(()=>{
    if(currentUser){
        router.push('/cart')
        router.refresh()
    }
    },[])

   const onSubmit:SubmitHandler<FieldValues>=(data)=>{
    setIsLoading(true)
    // console.log(data)
    axios.post('/api/register',data).then(()=>{
        toast.success('Account Created')

        signIn('credentials',{
            email:data.email,
            password:data.password,
            redirect:false,
        }).then((callback)=>{
           if(callback?.ok){
            router.push('/')
            router.refresh();
            toast.success('Logged In')
           }
           if(callback?.error){
            toast.error(callback.error)
           }
        })
    }).catch(()=>toast.error("something went wrong")).finally(()=>{
        setIsLoading(false)
    })
    
   }

   if(currentUser){
    return <p className='text-center'>Logged in. Redirecting...</p>
}
  
   
    return (
        <div className="flex flex-col items-center justify-center">
            <Heading title='Sign up for E-shop' />

            <Button outline label='Sign up with Google' icon={FaGoogle} onclick={()=>{signIn('google')}}/>
            <hr className='bg-slate-300 w-full h-px' />

            <hr className='bg-slate-300 w-full h-px mt-3' />

            <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required/>

            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required/>

            <Input id='password' label='Password' disabled={isLoading} register={register} errors={errors} required type='password'/>


          
             <Button label={isLoading?"Loading":'SignUp'} onclick={handleSubmit(onSubmit)}/>

           
            
            <p className='text-sm mt-4'>
                Already Have an Account?
                <Link className='underline' href='/Login'>
                    Log in
                </Link>
            </p>


        </div>
    )
}

export default RegisterForm

