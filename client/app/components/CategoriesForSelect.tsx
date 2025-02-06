import React, { useEffect, useState } from "react";
import Category from "../interfaces/Category";
import SelectComponent from "./SelectComponent";

interface SetCategoryProps {
    category: Category | null;
    setCategory: (category: Category | null) => void;
}

const CategoriesForSelect: React.FC<SetCategoryProps> = ({ category, setCategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/get`,
            {
                cache: "no-store",
                method: 'GET',
                mode: 'cors', // Ensures CORS is enabled
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            setCategories(await res.json());
            setLoading(false);
        };

        getCategories();
    }, []);

    if(loading) {
        return <div>Loading...</div>
    }
    return (
        <SelectComponent 
            category={category}
            setSelect={setCategory} 
            selectOptions={categories} />
    );
};

export default CategoriesForSelect;
