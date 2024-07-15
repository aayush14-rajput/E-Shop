"use client"
// zero auth
import React from 'react'
import {FieldErrors, FieldValues, UseFormRegister} from 'react-hook-form'


interface TextAreaProps{
    id :string,
    label:string,
    disabled?:boolean,
    required?:boolean,
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
    
}

const TextArea:React.FC<TextAreaProps> = ({id,label,disabled,required,register,errors,
   
}) => {
  return (
    <div className='w-full relative'>
        <textarea
        id={id}
        disabled={disabled}
        {...register(id,{required})}
        placeholder=''
        className='peer p-4 w-full border border-gray-300 max-h-[150px] min-h-[150px] rounded-md mb-4 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-600'/>

        <label  className={`absolute left-4 top-2 transition-all transform -translate-y-1/2 text-gray-400 pointer-events-none peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:transform peer-placeholder-shown:-translate-y-1/2 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-600`} htmlFor={id}
>{label}</label>
    </div>
  )
}

export default TextArea