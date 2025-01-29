import UpdateItemComponent from "@/app/components/UpdateItemComponent";
import Item from "@/app/interfaces/Item";
import PageProps from "@/app/interfaces/PageId";
import React from "react";

const UpdateItem = async ({ params }: PageProps) => {
    const { id } = await params;

    // Make GET request to get the specific Category by Id
    const res = await fetch(`http://localhost:5229/api/item/get/${id}`);
    const item: Item = await res.json();
    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">Edit <i className="underline">{item.name}</i></h1>

            {/* Update Category form */}
            <UpdateItemComponent item={item} />
        </div>
    );
};

export default UpdateItem;
