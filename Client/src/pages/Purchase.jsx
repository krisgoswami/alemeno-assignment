import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import toast from 'react-hot-toast';


const Purchase = () => {

	const id = useParams().id;
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		cardNumber: '',
		expiryMonth: '',
		expiryYear: '',
		cvv: '',
	});

	const [errors, setErrors] = useState({});

	const handleInputChange = (e) => {
		setInputs(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		setErrors(prevState => ({
			...prevState,
			[e.target.name]: '',
		}));
	};

	const handlePurchase = async (e) => {
		e.preventDefault();
		if (!inputs.cardNumber || !inputs.expiryMonth || !inputs.expiryYear || !inputs.cvv) {
			toast.error("Fields cannot be empty");
			return;
		}

		// Validate Card Number
		const cardNumberRegex = /^[0-9]{16}$/;
		if (!cardNumberRegex.test(inputs.cardNumber)) {
			setErrors({ ...errors, cardNumber: 'Invalid card number' });
			return;
		}

		// Validate Expiry Month (should be between 1 and 12)
		const expiryMonth = parseInt(inputs.expiryMonth, 10);
		if (isNaN(expiryMonth) || expiryMonth < 1 || expiryMonth > 12) {
			setErrors({ ...errors, expiryMonth: 'Invalid expiry month' });
			return;
		}

		// Validate Expiry Year (should be a 2 digit number)
		const expiryYear = parseInt(inputs.expiryYear, 10);
		if (isNaN(expiryYear) || expiryYear < 0 || expiryYear > 99) {
			setErrors({ ...errors, expiryYear: 'Invalid expiry year' });
			return;
		}

		// Validate CVV (should be a 3 digit number)
		const cvvRegex = /^[0-9]{3}$/;
		if (!cvvRegex.test(inputs.cvv)) {
			setErrors({ ...errors, cvv: 'Invalid CVV' });
			return;
		}

		try {
			const { data } = await axios.post(`${BASE_URL}/api/v1/user/enroll/${id}`, {}, {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});
			// console.log(data);
			if (data.success) {
				toast.success("Course Purchased");
				navigate('/enrolledCourses');
			}
		}
		catch (error) {
			console.log(error);
			toast.error("Something went wrong. Check log.");
		}
	}
	return (
		<div className="h-screen p-8 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
			<h2 className="text-center dark:text-white text-2xl font-bold mb-8">Purchase Course</h2>
			<div className='mx-auto w-96'>
				<form onSubmit={handlePurchase}>
					{/* Card Number */}
					<div className="mb-4">
						<label htmlFor="cardNumber" className="block text-gray-700 dark:text-white mb-2">
							Card Number
						</label>
						<input
							type="text"
							id="cardNumber"
							name="cardNumber"
							value={inputs.cardNumber}
							onChange={handleInputChange}
							className="w-full sm:w-full border dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-200 rounded px-4 py-2"
							placeholder="1234 5678 9012 3456"
						/>
					</div>

					{/* Expiry Date */}
					<div className="flex flex-col md:flex-row mb-4">
						<div className="w-full md:w-1/2 md:mr-2 mb-2 md:mb-0">
							<label htmlFor="expiryMonth" className="block text-gray-700 dark:text-white mb-2">
								Expiry Month
							</label>
							<input
								type="text"
								id="expiryMonth"
								name="expiryMonth"
								value={inputs.expiryMonth}
								onChange={handleInputChange}
								className="w-full sm:w-full border dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-200 rounded px-4 py-2"
								placeholder="MM"
							/>
						</div>
						<div className="w-full md:w-1/2 md:ml-2">
							<label htmlFor="expiryYear" className="block text-gray-700 dark:text-white mb-2">
								Expiry Year
							</label>
							<input
								type="text"
								id="expiryYear"
								name="expiryYear"
								value={inputs.expiryYear}
								onChange={handleInputChange}
								className="w-full sm:w-full border dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-200 rounded px-4 py-2"
								placeholder="YY"
							/>
						</div>
					</div>

					{/* CVV */}
					<div className="mb-8">
						<label htmlFor="cvv" className="block text-gray-700 dark:text-white mb-2">
							CVV
						</label>
						<input
							type="text"
							id="cvv"
							name="cvv"
							value={inputs.cvv}
							onChange={handleInputChange}
							className="w-full sm:w-full border dark:bg-gray-600 dark:text-gray-50 dark:border-gray-600 border-gray-200 rounded px-4 py-2"
							placeholder="123"
						/>
					</div>

					{/* Display validation errors */}
					{Object.keys(errors).map((fieldName) => (
						<div key={fieldName} className="text-red-500 mb-2">
							{errors[fieldName]}
						</div>
					))}
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white dark:bg-white hover:dark:bg-gray-200 dark:text-gray-700 font-medium w-full py-2 px-4 rounded-md"
					>
						Purchase
					</button>
				</form>
			</div>
		</div>

	)
}

export default Purchase