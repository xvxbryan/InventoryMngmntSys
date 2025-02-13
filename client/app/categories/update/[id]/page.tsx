import UpdateCategoryName from "@/app/components/UpdateCategoryName";
import Category from "@/app/interfaces/Category";
import { PageProps } from "@/app/interfaces/PageId";
import React from "react";

// This page allows users to update the name of an existing Category

const UpdateCategory = async ({ params }: PageProps) => {
    try {
        const { id } = await params;

        // Make GET request to get the specific Category by Id
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/get/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch category: ${res.statusText}`);
        }

        const category: Category = await res.json();

        return (
            <div className="p-5">
                <h1 className="mb-5 text-3xl font-semibold">
                    Edit <i className="underline">{category.name}</i>
                </h1>

                {/* Update Category form */}
                <UpdateCategoryName id={category.id} />
            </div>
        );
    } catch (error) {
        console.log("error ", error)
        return (
            <div className="p-5 text-red-500">
                <h1 className="text-2xl font-semibold">Error</h1>
                <p>Could not fetch category details. Please try again later.</p>
            </div>
        );
    }
};

export default UpdateCategory;
