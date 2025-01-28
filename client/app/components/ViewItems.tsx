import Link from 'next/link';
import React from 'react'
import Category from '../interfaces/Category';

// This component displays all the existing items

interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: Category;
}

const ViewItems = () => {
    return (
        <div>
            
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>
                <Link href="items/add">Add Item</Link>
            </button>
            <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                <Link href="/">Cancel</Link>
            </button>
        </div>
    )
}

export default ViewItems