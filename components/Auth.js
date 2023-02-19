import { useState } from 'react'
import { supabase } from '../context/supabaseClient'
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Router } from 'next/router';

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (error) throw error
            if (data) {
                toast.success(`Successfully Logged In`, {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        } catch (error) {
            toast.error(error.error_description || error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        } finally {
            setLoading(false)
        }
    }


    // The accounts to  login are created in the supabase dashboard by the CryptoCERT team to ensure authenicity of the certificates.

    return (
        <>
            <ToastContainer />
            <div class="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
                <div
                    class="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
                >
                    <div
                        class="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
                    >
                        <div class="my-3 text-4xl font-bold tracking-wider text-center">
                            <a href="#">CRYPTOCERT</a>
                        </div>
                        <p class="mt-6 font-normal text-center text-gray-300 md:mt-0">
                            Are you a trusted institution? <br />

                            The certificates uploaded must be verified by the institution. The certificate must have the student ID as the name for easier verification. The upload of the certificates to the blockchain involves use of gas.
                        </p>
                        <p class="flex flex-col items-center justify-center mt-10 text-center">
                            <span>Need an account?</span>
                            <a href="#" class="underline">Get Started!</a>
                        </p>
                        <p class="mt-6 text-sm text-center text-gray-300">
                            Read our <a href="#" class="underline">terms</a> and <a href="#" class="underline">conditions</a>
                        </p>
                    </div>
                    <div class="p-5 bg-white md:flex-1">
                        <h3 class="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                        <form action="#" class="flex flex-col space-y-5">
                            <div class="flex flex-col space-y-1">
                                <label for="email" class="text-sm font-semibold text-gray-500">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                    class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div class="flex flex-col space-y-1">
                                <div class="flex items-center justify-between">
                                    <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
                                    <a href="#" class="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    class="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                                />
                            </div>
                            <div class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    class="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                                />
                                <label for="remember" class="text-sm font-semibold text-gray-500">Remember me</label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleLogin}
                                    class="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
       

    )
}