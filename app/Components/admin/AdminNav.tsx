"use client"
import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import NavItem from './NavItem'
import { MdDashboard } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import { MdDns } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { usePathname } from 'next/navigation';


const AdminNav = () => {
    const pathname = usePathname()
    return (
        <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
            <Container>
                <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap'>
                    <Link href='/admin'>
                        <NavItem label='Summary' icon={MdDashboard} selected={pathname === "/admin"} />
                    </Link>
                    <Link href='/admin/add-products'>
                        <NavItem label='AddProducts' icon={MdLibraryAdd} selected={pathname === "/admin/add-products"} />
                    </Link>

                </div>
            </Container>

        </div>
    )
}

export default AdminNav