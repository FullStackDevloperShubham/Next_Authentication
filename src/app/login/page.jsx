'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { NextResponse, NextRequest } from 'next/server'

export default function LoginPage() {

    const router = useRouter()

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);



    const onLogin = async () => {
        try {
            setLoading(true)
            await axios.post('/api/users/login', user)
            console.log('LogIn successful', NextResponse.user)
            // toast.success("Login success");
            // toast.success("Login successful")
            router.push("/profile")
        } catch (error) {
            console.log("log in failed", error.message);
            toast.error(error.message);
            // toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user])


    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-semibold mb-4">{loading ? 'Processing' : 'Log In'}</h1>

            <label htmlFor="email" className="block mb-2 text-red-600">Email</label>
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder='Enter your email'
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500 text-green-400"
            />

            <label htmlFor="password" className="block mb-2 text-red-600">Password</label>
            <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='Enter your password'
                className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4 focus:outline-none focus:border-blue-500 text-green-400"
            />

            <button onClick={onLogin} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4">
                Log In
            </button>

            <Link href='/signup' className='block text-center border border-red-400 py-2 rounded-md text-red-400 hover:text-red-600'>
                Visit SignUp page
            </Link>
        </div>
    )
}