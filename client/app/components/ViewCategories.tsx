import React from "react";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
}

const ViewCategories = async () => {
    const res = await fetch("http://localhost:5229/api/category/get");
    const categories : Category[] = await res.json();
    return (
        <div>
            <ul className="mb-5">
                {categories.map(category => 
                    <li key={category.id}>
                        {category.name} &nbsp;
                        <i>
                            <Link href={`categories/update/${category.id}`} className="text-blue-600 underline">Update</Link>
                        </i>
                    </li>
                )}
            </ul>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>
                <Link href="categories/create">Add Category</Link>
            </button>
            <button className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                <Link href="/">Cancel</Link>
            </button>
        </div>
    );
};

export default ViewCategories;
