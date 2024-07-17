"use client";
import React, { Suspense } from 'react';
import Container from '../Container';
import { categories } from '@/Utils/Categories';
import { usePathname, useSearchParams } from 'next/navigation';
import CategoryWithSuspense from './Category';

const CategoriesContent = () => {
    const params = useSearchParams();
    const category = params?.get('category');  //getting category from params

    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return (
        <div className='bg-white'>
            <Container>
                <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                    {categories.map((items) => (
                        <CategoryWithSuspense 
                            key={items.label} 
                            label={items.label} 
                            icon={items.icon} 
                            selected={category === items.label || (category === null && items.label === 'All')}
                        />
                    ))}
                </div>
            </Container>
        </div>
    );
};

const Categories = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <CategoriesContent />
    </Suspense>
);

export default Categories;
