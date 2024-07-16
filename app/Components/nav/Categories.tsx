"use client"
import React, { Suspense } from 'react';
import Container from '../Container';
import { categories } from '@/Utils/Categories';
import Category from './Category';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = ({ category }) => {
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return (
        <div className='bg-white'>
            <Container>
                <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
                    {categories.map((items) => (
                        <div key={items.label}>
                            <Category 
                                label={items.label} 
                                icon={items.icon} 
                                selected={category === items.label || (category === null && items.label === 'All')}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

const CategoriesWithParams = () => {
    const params = useSearchParams();
    const category = params?.get('category'); // getting category from params

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Categories category={category} />
        </Suspense>
    );
};

export default CategoriesWithParams;
