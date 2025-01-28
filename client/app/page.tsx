import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className="p-5">
                <div>
                    <Link href="items" className="text-blue-600 underline">
                        View Items
                    </Link>
                </div>
                <div>
                    <Link href="categories" className="text-blue-600 underline">
                        View Categories
                    </Link>
                </div>
            </div>
        </main>
    );
}
