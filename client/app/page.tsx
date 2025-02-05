import ViewItems from "./components/ViewItems";
// import SearchBar from "./components/SearchBar";

export default function Home() {
    return (
        <main>
            <div className="p-5">
                <div className="flex flex-row">
                    <h1 className="mb-5 text-3xl font-semibold">Items</h1>
                    {/* <SearchBar/> */}
                </div>
                <ViewItems />
            </div>
        </main>
    );
}
