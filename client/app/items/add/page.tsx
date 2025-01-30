"use client";
import CategoriesForSelect from "@/app/components/CategoriesForSelect";
import InputComponent from "@/app/components/InputComponent";
import SelectComponent from "@/app/components/SelectComponent";
import Category from "@/app/interfaces/Category";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// This page allows users to add new Items to be stored in the database.

const Add = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState<Category | null>(null);

    const router = useRouter();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Make POST request to create new Category
            const response = await fetch("http://localhost:5229/api/item/create", {
                method: "POST",
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
            });

            if (response.ok) {
                alert("Item created successfully");
                router.push(`/`);
            } else {
                const errorData = await response.json();
                alert(`Error creating item: ${errorData.message}`);
            }
        } catch (error) {
            alert(`An unexpected error occurred: ${error}`);
        }
    }    

    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">Add Item</h1>

            <form onSubmit={submitHandler}>
                <InputComponent
                    label="Name"
                    value={name}
                    change={setName}
                    placeholder="Item Name"
                    type="text"
                />
                <InputComponent
                    label="Description"
                    value={description}
                    change={setDescription}
                    placeholder="Item Description"
                    type="text"
                />
                <InputComponent
                    label="Quantity"
                    value={quantity}
                    change={setQuantity}
                    placeholder="Number of items"
                    type="number"
                />
                <InputComponent
                    label="Price"
                    value={price}
                    change={setPrice}
                    placeholder="Price of item"
                    type="number"
                />
                <CategoriesForSelect
                    category={category}
                    setCategory={setCategory}
                    />

                <div className="mt-5">
                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5'>Add Item</button>
                    <button type="button" className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={() => router.push(`/`)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
