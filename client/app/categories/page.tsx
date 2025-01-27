import React from "react";
import ViewCategories from "../components/ViewCategories";

// This page displays all the existing categories

const Categories = () => {
    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">Categories</h1>
            <ViewCategories />
        </div>
    );
};

export default Categories;
