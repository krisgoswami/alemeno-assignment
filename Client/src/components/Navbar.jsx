import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DarkThemeToggle } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import logo from '../assets/images/company-logo.png';

const Navbar = () => {

	//global state
	let isLogin = useSelector((state) => state.isLogin);
	isLogin = isLogin || localStorage.getItem('userId');

	let user = localStorage.getItem("username");
	let userId = localStorage.getItem("userId");

	const [searchQuery, setSearchQuery] = useState('');
	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim() !== '') {
			navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
		}
	};


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
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<nav className="z-40 top-0 left-0 right-0 bg-blue-100 text-gray-800 dark:bg-gray-800 dark:text-white p-4">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<div className="font-bold text-xl cursor-pointer" onClick={() => { navigate('/') }}>
						<img src={logo} alt="alemeno logo" />
					</div>
					<div className="block lg:hidden">
					</div>
					<div className='flex'>
						<div className="lg:flex items-center justify-between text-lg gap-4 mr-10">
							<p className="font-medium text-base cursor-pointer hidden lg:block" onClick={() => { navigate('/') }}>Home</p>
							<p className="font-medium text-base cursor-pointer hidden lg:block" onClick={() => { navigate('/courses') }}>Courses</p>
						</div>
						<form onSubmit={handleSearch} className="flex items-center">
							<input
								type="text"
								value={searchQuery}
								onChange={handleInputChange}
								placeholder="Search courses..."
								className="border dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-50 w-96 p-2 mr-2 rounded-md"
							/>
							<button
								type="submit"
								className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-white hover:dark:bg-gray-200 dark:text-gray-700 font-bold py-2 px-4 rounded-md"
							>
								Search
							</button>
						</form>
						<div className='ml-5'>
							<DarkThemeToggle></DarkThemeToggle>
						</div>
					</div>
					<div className='flex items-center'>
						{!isLogin &&
							<button className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-white hover:dark:bg-gray-200 dark:text-gray-700 font-bold px-4 py-2 rounded-md ml-20" onClick={handleLogin}>Login</button>
						}

						{isLogin &&
							<div className="mx-auto flex items-center justify-center bg-none rounded-md">
								<div className="group relative cursor-pointer">
									<div className="bg-blue-500 text-white dark:bg-white dark:text-gray-700 flex items-center justify-between space-x-3 bg-none pr-2 rounded-lg shadow-sm mb-1">
										<a className="menu-hover py-2 text-base font-medium lg:mx-4" onClick="">
											{user}
										</a>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
												stroke="black" className="h-6 w-6">
												<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
											</svg>
										</span>
									</div>

									<div
										className="invisible absolute z-50 flex w-full flex-col rounded-md bg-white  text-gray-800 shadow-xl group-hover:visible">
										<a className=" block border-b border-gray-300 text-sm py-3 font-medium text-gray-800 md:px-2" onClick={() => { navigate(`/profile/${userId}`) }}>
											Profile
										</a>
										<a className=" block border-b border-gray-300  text-sm py-3 font-medium text-gray-800 md:px-2" onClick={() => { navigate('/enrolledCourses') }}>
											Enrolled courses
										</a>
										<a className="block text-sm py-3 font-medium text-gray-800 md:px-2" onClick={handleLogout}>
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