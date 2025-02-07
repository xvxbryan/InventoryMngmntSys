"use client";
import React, { useEffect } from "react";
import InputComponent from "./InputComponent";
import { useDebounce } from "../utils/useDebounce";
import Item from "../interfaces/Item";

interface SearchProps {
    search: string;
    setSearch: (value: string) => void;
    setLoading: (value: boolean) => void;
    setItems: (value: Item[]) => void;
}

const SearchBar: React.FC<SearchProps> = ({search, setSearch, setLoading, setItems}) => {
    const debouncedQuery = useDebounce(search, 500);

    useEffect(() => {
        if(debouncedQuery) {
            fetchData(debouncedQuery);
        }
    }, [debouncedQuery]);

    useEffect(() => {
        if(search.length > 0) {
            setLoading(true);
        }
    }, [search.length > 0]);

    const fetchData = async (searchTerm: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/item/get?name=${searchTerm}`, { cache: "no-store" });
            setItems(await res.json());
            setLoading(false);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        <div className="flex flex-row m-auto">
            <InputComponent
                label=""
                value={search}
                change={setSearch}
                placeholder="Search for an item"
                type="text"
            />
        </div>
    );
};

export default SearchBar;
