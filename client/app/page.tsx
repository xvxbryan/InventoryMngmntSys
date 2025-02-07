"use client";
import ViewItems from "./components/ViewItems";
import SearchBar from "./components/SearchBar";
import { useEffect, useState } from "react";
import Item from "./interfaces/Item";

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        const getItems = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/item/get`,
                    { cache: "no-store" }
                );
                setItems(await res.json());
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                setLoading(false);
            }
        };

        if(search.length === 0) {
            getItems();
        }
    }, [search.length]);

    return (
        <main>
            <div className="p-5">
                <div className="flex flex-row">
                    <h1 className="mb-5 text-3xl font-semibold">Items</h1>
                    <SearchBar 
                        search={search}
                        setSearch={setSearch}
                        setLoading={setLoading}
                        setItems={setItems}/>
                </div>
                {
                    loading ?
                    <div className="h-screen flex justify-center items-center">Loading items...</div>
                    :
                    <ViewItems 
                        items={items}/>
                }
            </div>
        </main>
    );
}
