"use client"
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';
;
import React, { useCallback,Suspense} from 'react'
import { IconType } from 'react-icons';
import queryString from 'query-string';

interface CategoryProps{
    label:string;
    icon:IconType;
    selected?:boolean
}

const Category:React.FC<CategoryProps> = ({label,icon:Icon,selected}) => {

    const router=useRouter()
    const params=useSearchParams()
    const handleClick=useCallback(()=>{
     if(label === 'all'){
        router.push('/')
     }else{
        let currentQuery={};
        if(params){
            currentQuery=queryString.parse(params.toString())
        }

        const updatedQuery:any={

         ...currentQuery,
         category:label
        }

        const url=queryString.stringifyUrl(
            {
                url:'/',
                query:updatedQuery
            },
            {
                skipNull:true
            }
          
        )

        router.push(url)
     }
        
    },[label,params,router])
  return (
    <div onClick={handleClick} className={`flex items-center justify-center text-center gap-1 border-b-2 hover:text-slate-800 transition cursor-pointer ${selected? 'border-b-slate-800':'border-transparent text-slate-500'}`}>
       <Icon size={20}/>
       <div className='font-medium text-sm'>
{label}
       </div>
    </div>
  )
}

const CategoryWithSuspense: React.FC<CategoryProps> = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Category {...props} />
    </Suspense>
);

export default CategoryWithSuspense