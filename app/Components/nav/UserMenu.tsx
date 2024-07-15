"use client"
import React, { useCallback, useState } from 'react'
import Avatar from '../Avatar'
import { AiFillCaretDown } from "react-icons/ai";
import Link from 'next/link';
import MenuItem from './MenuItem';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { safeUser } from '@/types';

interface UserMenuProps {
  currentUser: safeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toogleOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, []);
  return (
    <>
      <div className='relative z-30'>
        <div onClick={toogleOpen} className='p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700 '>
          <Avatar src={currentUser?.image}/>
          <AiFillCaretDown />
        </div>
        {isOpen && (
          <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
            {currentUser ? <div>
              <Link href="/orders">
                <MenuItem onclick={toogleOpen}>Your Orders</MenuItem>
              </Link>
              <Link href="/admin">
                <MenuItem onclick={toogleOpen}>Admin Dahboard</MenuItem>
              </Link>
              <hr />
              <MenuItem onclick={() => {
                toogleOpen();
                signOut()
              }}>
                Logout</MenuItem>
            </div> : <div>
              <Link href="/Login">
                <MenuItem onclick={toogleOpen}>Login</MenuItem>
              </Link>
              <Link href="/Register">
                <MenuItem onclick={toogleOpen}>Register</MenuItem>
              </Link>
            </div>}




          </div>
        )}


      </div>
      {isOpen ? <BackDrop onclick={toogleOpen} /> : null}
    </>

  )
}

export default UserMenu