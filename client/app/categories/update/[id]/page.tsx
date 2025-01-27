import UpdateCategoryName from "@/app/components/UpdateCategoryName";
import React from "react";

interface PageProps {
    params: { id: string };
}

interface Category {
    id: number;
    name: string;
}

const UpdateCategory = async ({ params }: PageProps) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5229/api/category/get/${id}`);
    const category: Category = await res.json();
    
    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">{category.name}</h1>
            <UpdateCategoryName id={category.id}/>
        </div>
    );
};

export default UpdateCategory;
