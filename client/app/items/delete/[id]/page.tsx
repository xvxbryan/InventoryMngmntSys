import DeleteItemComponent from "@/app/components/DeleteItemComponent";
import Item from "@/app/interfaces/Item";
import { PageProps } from "@/app/interfaces/PageId";
import Link from "next/link";
import React from "react";

const DeleteItem = async ({ params }: PageProps) => {
    const { id } = await params;

    try {
        // Make GET request to get the specific Category by Id
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/get/${id}`, { cache: "no-store" });
        const item: Item = await res.json();

        return (
            <div className="p-5">
                <h1 className="mb-5 text-3xl font-semibold">
                    Delete <i className="underline">{item.name}</i>
                </h1>

                <div className="mb-5">
                    <b className="text-red-600">
                        Are you sure you wish to delete this item?
                    </b>
                </div>
                <div>
                    <DeleteItemComponent id={id} />
                    <button
                        type="button"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <Link href="/">Cancel</Link>
                    </button>
                </div>
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

export default DeleteItem;
