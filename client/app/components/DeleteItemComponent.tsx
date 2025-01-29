"use client";
import { useRouter } from "next/navigation";
import React from "react";

interface DeleteProps {
    id: string;
}

const DeleteItemComponent: React.FC<DeleteProps> = ({ id }) => {
    const router = useRouter();

    const deleteItem = async () => {
        try {
            // Make PUT request to update the properties of an existing Item
            const response = await fetch(
                `http://localhost:5229/api/item/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                alert("Item updated successfully");
                router.push(`/items`);
            } else {
                const errorData = await response.json();
                alert(`Error updating item: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        }
    };

    return (
        <button
            onClick={() => deleteItem()}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-5"
        >
            Delete
        </button>
    );
};

export default DeleteItemComponent;
