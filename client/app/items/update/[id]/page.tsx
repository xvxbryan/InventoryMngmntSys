import UpdateItemComponent from "@/app/components/UpdateItemComponent";
import Item from "@/app/interfaces/Item";
import { PageProps } from "@/app/interfaces/PageId";
import React from "react";

const UpdateItem = async ({ params }: PageProps) => {
    const { id } = await params;

    try {
        // Make GET request to get the specific Category by Id
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/get/${id}`, { cache: "no-store" });
        const item: Item = await res.json();
        return (
            <div className="p-5">
                <h1 className="mb-5 text-3xl font-semibold">Edit <i className="underline">{item.name}</i></h1>

                {/* Update Category form */}
                <UpdateItemComponent item={item} />
            </div>
        );
    } catch (error) {
        console.log("error ", error)
        return (
            <div className="p-5 text-red-500">
                <h1 className="text-2xl font-semibold">Error</h1>
                <p>Could not fetch item details. Please try again later.</p>
            </div>
        );
    }
};

export default UpdateItem;
