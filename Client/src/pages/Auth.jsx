import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { BASE_URL } from '../utils/helper';
import { useCallback } from 'react';
import { authActions } from '../redux/authSlice';

const Auth = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [authState, setAuthState] = useState('login');
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });

    //toggle between login and signup

    const toggleAuthState = useCallback(() => {
        setAuthState((currentAuthState) => currentAuthState === "login" ? "signup" : "login");
    }, []);

    // handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    //login logic
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.user._id);
                localStorage.setItem("email", data?.user.email);
                localStorage.setItem("username", data?.user.name);
                dispatch(authActions.login());
                toast.success("Logged in");
                navigate('/');
            } else {
                toast.error("Email or password incorrect");
            }
        } catch (error) {
            console.log(error);
            toast.error("incorrect id or password");
        }
    };
    //signup logic
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!inputs.name || !inputs.email || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.user._id);
                localStorage.setItem("email", data?.user.email);
                localStorage.setItem("username", data?.user.name);
                dispatch(authActions.login());
                toast.success("Registered");
                navigate('/');
            } else {
                toast.error("Email or password incorrect");
            }
        } catch (error) {
            console.log(error);
            toast.error("incorrect");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:h-screen">
            {/* Left side */}
            <div className="lg:flex-1 dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] bg-blend-multiply text-gray-800 dark:text-gray-50 p-12 flex items-center justify-center">
                <div>
                    <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">Alemeno Courses</h2>
                    <p className="text-lg text-center lg:text-left">Login to access your account.</p>
                </div>
            </div>

            {/* Right side */}
            <div className="dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')] bg-blend-multiply text-gray-800 dark:text-gray-50 lg:flex-1 flex items-center justify-center p-12">
                <form className="max-w-md p-5 w-full space-y-4">
                    <h2 className="text-2xl font-bold text-center">
                        {authState === "login" ? "Login" : "Create an account"}
                    </h2>

                    {authState === "signup" && (
                        <div>
                            <label className="block text-gray-700 dark:text-white">Username</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border shadow-md dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-50 rounded-md px-4 py-2"
                                placeholder="Enter your Username"
                                value={inputs.name}
                                onChange={handleOnChange}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-700 dark:text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border shadow-md dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-50 rounded-md px-4 py-2"
                            placeholder="Enter your email"
                            value={inputs.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border shadow-md dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-50 rounded-md px-4 py-2"
                            placeholder="Enter your password"
                            value={inputs.password}
                            onChange={handleOnChange}
                        />
                    </div>
                    {authState === "login" ? (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white dark:bg-white hover:dark:bg-gray-200 dark:text-gray-700 font-semibold py-2 rounded-lg"
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white dark:bg-white hover:dark:bg-gray-200 dark:text-gray-700 font-semibold py-2 rounded-lg"
                            onClick={handleSignup}
                        >
                            Sign Up
                        </button>
                    )}

                    <p className="text-center">
                        {authState === "login" ? "Don't have an account?" : "Already have an account?"}
                        <span>
                            {authState === "login" ? (
                                <a className='ml-1 hover:underline cursor-pointer text-blue-700 dark:text-yellow-300' onClick={toggleAuthState}>Sign Up</a>
                            ) : (
                                <a className='ml-1 hover:underline cursor-pointer text-blue-700 dark:text-yellow-300' onClick={toggleAuthState}>Login</a>
                            )}
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Auth;