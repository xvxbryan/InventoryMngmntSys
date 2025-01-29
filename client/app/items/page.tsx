import React from "react";
import ViewItems from "../components/ViewItems";

const ItemsPage = () => {
    return (
        <div className="p-5">
            <h1 className="mb-5 text-3xl font-semibold">Items</h1>
            <ViewItems/>
        </div>
    );
};

export default ItemsPage;
