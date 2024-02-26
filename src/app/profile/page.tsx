'use client'
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from "react"
import toast from "react-hot-toast"

export default function ProfilePage() {


    const router = useRouter()
    const [data, setData] = useState('Nothing')

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data)
        setData(res.data.data.username)
    }



    return (

        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <hr className="my-4 border-gray-300" />
            <h1 className="text-lg font-semibold mb-2">Profile Page</h1>
            <h2 className="text-base mb-4">
                {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">{data}</Link>}
            </h2>
            <hr className="my-4 border-gray-300" />
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">
                Log Out
            </button>
            <button onClick={getUserDetails} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                Get User Details
            </button>
        </div>
    )
}