"use client";
import React, { useState } from "react";
import Item from "../interfaces/Item";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";
import CategoriesForSelect from "./CategoriesForSelect";
import Category from "../interfaces/Category";

interface UpdateItemProps {
    item: Item;
}

const UpdateItemComponent: React.FC<UpdateItemProps> = ({ item }) => {
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [quantity, setQuantity] = useState(item.quantity);
    const [price, setPrice] = useState(item.price);
    const [category, setCategory] = useState<Category | null>(item.category);
    const router = useRouter();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Make PUT request to update the properties of an existing Item
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/item/update/${item.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        description,
                        quantity,
                        price,
                        categoryId: category?.id,
                    }),
                }
            );

            if (response.ok) {
                alert("Item updated successfully");
                router.push(`/`);
            } else {
                const errorData = await response.json();
                alert(`Error updating item: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        }
    };

    const handleQuantityChange = (value: string) => {
        setQuantity(Number(value)); // Convert the string value to a number
    };

    const handlePriceChange = (value: string) => {
        setPrice(Number(value)); // Convert the string value to a number
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="flex flex-col mb-5">
                <div>
                    <InputComponent
                        label="Edit Name"
                        value={name}
                        change={setName}
                        placeholder="Replace item name"
                        type="text"
                    />
                </div>
                <div>
                    <InputComponent
                        label="Edit Description"
                        value={description}
                        change={setDescription}
                        placeholder="Replace description"
                        type="text"
                    />
                </div>
                <div>
                    <InputComponent
                        label="Edit Quantity"
                        value={quantity.toString()}
                        change={handleQuantityChange}
                        placeholder="Replace quantity"
                        type="text"
                    />
                </div>
                <div>
                    <InputComponent
                        label="Edit Price"
                        value={price.toString()}
                        change={handlePriceChange}
                        placeholder="Replace price"
                        type="text"
                    />
                </div>
                <div>
                    <CategoriesForSelect
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5"
            >
                Update
            </button>
            <button
                type="button"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push(`/`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default UpdateItemComponent;
