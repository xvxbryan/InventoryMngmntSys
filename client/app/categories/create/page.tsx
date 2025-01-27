"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

// This page allows users to create new Categories to be stored in the database.

const Create = () => {
    const [name, setName] = useState("");
    const router = useRouter();

    // Called when user presses the Create button
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Make POST request to create new Category
            const response = await fetch("http://localhost:5229/api/category/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                alert("Category created successfully");
                router.push(`/categories`);
            } else {
                const errorData = await response.json();
                alert(`Error creating category: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        }
    }
    
    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">Create a category</h1>
            <form onSubmit={submitHandler}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add category name"
                />
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>Create</button>
                <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => router.push(`/categories`)}>Cancel</button>
            </form>
        </div>
    )
}

export default Create