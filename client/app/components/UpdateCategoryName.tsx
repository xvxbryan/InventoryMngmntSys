"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import InputComponent from "./InputComponent";

// This is the form where a user enters a new name for an existing Category

interface UpdateCategoryNameProps {
    id: number;
}

const UpdateCategoryName: React.FC<UpdateCategoryNameProps> = ({ id }) => {
    const [name, setName] = useState("");
    const router = useRouter();

    // Called when user presses the Update button
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Make PUT request to update the name of an existing Category
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/category/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name }),
                }
            );

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
    };

    return (
        <form onSubmit={submitHandler}>
            <InputComponent
                label="Edit Category"
                value={name}
                change={setName}
                placeholder="Replace category name"
                type="text"
            />
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"
            >
                Update
            </button>
            <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push(`/categories`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default UpdateCategoryName;
