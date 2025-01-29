import Category from "./Category";

export default interface Item {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
    category: Category;
}