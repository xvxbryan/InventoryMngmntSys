import DeleteItemComponent from "@/app/components/DeleteItemComponent";
import Item from "@/app/interfaces/Item";
import { PageProps } from "@/app/interfaces/PageId";
import Link from "next/link";
import React from "react";

const DeleteItem = async ({ params }: PageProps) => {
    const { id } = await params;

    // Make GET request to get the specific Category by Id
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/get/${id}`);
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
};

export default DeleteItem;
