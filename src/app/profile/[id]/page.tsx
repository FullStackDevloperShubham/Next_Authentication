import Link from 'next/link'
export default function UserProfile({ params }: any) {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-semibold mb-4 text-black">Profile</h1>
            <hr className="border-gray-300 my-4" />
            <h1 className="text-2xl font-semibold text-red-600">
                Profile Page:
                <span className="inline-block bg-gray-200 text-gray-800 p-2 rounded-md ml-2"> <Link href={'/profile'}>{params.id}</Link></span>
            </h1>
        </div>
    )
}




