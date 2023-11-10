import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Navbar = () => {

    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');

    let user = localStorage.getItem("username");
    let userId = localStorage.getItem("userId");

    // const [searchQuery, setSearchQuery] = useState('');
    // const handleInputChange = (e) => {
    //     setSearchQuery(e.target.value);
    // };

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     if (searchQuery.trim() !== '') {
    //         navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    //     }
    // };


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login');
    }

    //handle logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            localStorage.clear();
            toast("You've been logged out", {
                icon: '⚠️',
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <nav className="fixed z-10 top-0 left-0 right-0 bg-cyan-500 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold text-xl cursor-pointer" onClick={() => { navigate('/') }}>Alemeno</div>
                    <div className="block lg:hidden">
                    </div>
                    <div className="lg:flex items-center justify-between text-lg gap-4">
                        <p className="text-white font-medium cursor-pointer hidden lg:block" onClick={() => { navigate('/') }}>Home</p>
                        <p className="text-white font-medium cursor-pointer hidden lg:block" onClick={() => { navigate('/create') }}>Create Course</p>
                    </div>
                    <div className='flex items-center'>
                        {!isLogin &&
                            <button className="bg-white text-black font-bold px-4 py-2 rounded-md ml-20" onClick={handleLogin}>Login</button>
                        }
                        {isLogin &&
                            <div className="mx-auto flex items-center justify-center bg-none rounded-md">
                                <div className="group relative cursor-pointer">
                                    <div className="flex items-center justify-between space-x-5 bg-none px-2 rounded-sm">
                                        <a className="menu-hover py-2 text-base font-medium text-white lg:mx-4" onClick="">
                                            Hi, {user}! 👋
                                        </a>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                stroke="white" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </span>
                                    </div>

                                    <div
                                        className="invisible absolute z-50 flex w-full flex-col rounded-md bg-cyan-600  text-gray-800 shadow-xl group-hover:visible">

                                        <a className="block py-4 font-semibold text-white hover:text-cyan-200 md:mx-2" onClick={handleLogout}>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;