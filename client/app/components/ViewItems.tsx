import Link from 'next/link';
import React from 'react'
import Item from '../interfaces/Item';

// This component displays all the existing items



const ViewItems = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/get`);
        const items : Item[] = await res.json();
        return (
            <div>
                <table className="w-full text-left table-auto min-w-max mb-5">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Description</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Quantity</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Price</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Category</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Edit</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => 
                            <tr key={item.id}>
                                <td className="p-4 border-b border-blue-gray-50">{item.name}</td>
                                <td className="p-4 border-b border-blue-gray-50">{item.description}</td>
                                <td className="p-4 border-b border-blue-gray-50">{item.quantity}</td>
                                <td className="p-4 border-b border-blue-gray-50">${item.price.toFixed(2)}</td>
                                <td className="p-4 border-b border-blue-gray-50">{item.category.name}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <i>
                                        <Link href={`items/update/${item.id}`} className="text-blue-600 underline">Update</Link>
                                    </i>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <i>
                                        <Link href={`items/delete/${item.id}`} className="text-blue-600 underline">Delete</Link>
                                    </i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>
                    <Link href="items/add">Add Item</Link>
                </button>
                <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                    <Link href="/categories">View Categories</Link>
                </button>
            </div>
        )
    } catch (error) {
        console.log("error ", error)
        return (
            <div className="p-5 text-red-500">
                <h1 className="text-2xl font-semibold">Error</h1>
                <p>Could not fetch items. Please try again later.</p>
            </div>
        );
    }
}

export default ViewItems