import Link from "next/link";

export default function Home() {
    return (
        <main>
            <div className="p-5">
                <Link href="categories" className="text-blue-600 underline">View Categories</Link>
            </div>
        </main>
    );
}
