"use client";
import React, { useState } from "react";
import InputComponent from "./InputComponent";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    return (
        <div className="flex flex-row m-auto">
            <InputComponent
                label=""
                value={search}
                change={setSearch}
                placeholder="Search for an item"
                type="text"
            />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5'>Search</button>
        </div>
    );
};

export default SearchBar;
