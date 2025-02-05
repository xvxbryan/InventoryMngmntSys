import React from "react";
import Link from "next/link";
import Category from "../interfaces/Category";

// This component displays all the existing categories

const ViewCategories = async () => {
    // Make GET request to retrieve all existing categories
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/get`,{
            method: 'GET',
            mode: 'cors', // Ensures CORS is enabled
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const categories : Category[] = await res.json();
        return (
            <div className="w-full max-w-sm min-w-[200px]">
                <table className="w-full text-left table-auto min-w-max mb-5">
                    <thead>
                        <tr>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Name</th>
                            <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => 
                            <tr key={category.id}>
                                <td className="p-4 border-b border-blue-gray-50">{category.name}</td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <i>
                                        <Link href={`categories/update/${category.id}`} className="text-blue-600 underline">Update</Link>
                                    </i>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>
                    <Link href="categories/create">Add Category</Link>
                </button>
                <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                    <Link href="/">Cancel</Link>
                </button>
            </div>
        );
    } catch (error) {
        console.log("error ", error)
        return (
            <div className="p-5 text-red-500">
                <h1 className="text-2xl font-semibold">Error</h1>
                <p>Could not fetch categories. Please try again later.</p>
            </div>
        );
    }
};

export default ViewCategories;
