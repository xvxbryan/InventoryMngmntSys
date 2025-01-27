"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UpdateCategoryNameProps {
    id: number;
}

const UpdateCategoryName: React.FC<UpdateCategoryNameProps> = ({ id }) => {
    const [name, setName] = useState("");
    const router = useRouter();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5229/api/category/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                alert("Category updated successfully");
                router.push(`/categories/`);
            } else {
                const errorData = await response.json();
                alert(`Error updating category: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Replace category name"
            />
            <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>Update</button>
            <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => router.push(`/categories`)}>Cancel</button>
        </form>
    );
};

export default UpdateCategoryName;
