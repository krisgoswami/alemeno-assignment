import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import toast from 'react-hot-toast';

const CourseCard = ({ id, title, instructor, thumbnail, isCompleted }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    //handle mark complete
    const handleMarkComplete = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/markComplete/${id}`, {}, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                toast.success("You marked this course as complete.")
                location.reload();
            }
        } catch (error) {
            console.log(error);
            toast.error("Already marked as complete.")
        }
    }

    return (
        <div className="bg-slate-50 w-full md:w-80 h-[400px] p-4 shadow-md rounded-2xl mb-10">
            <img src={thumbnail} alt={''} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-xl text-black font-medium mb-2 max-h-24 truncate overflow-hidden">{title}</h3>
            <p className="text-gray-700 mb-2 font-normal text-lg mt-4">by <span className='font-semibold'>{instructor}</span></p>
            <div className='flex flex-col md:flex-row justify-between'>
                <button
                    onClick={() => {
                        navigate(`/course/${id}`);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg mt-2 md:mt-0">
                    View
                </button>
                <button
                    onClick={handleMarkComplete}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg mt-2 md:mt-0">
                    Mark as complete
                </button>
            </div>
        </div>

    );
};

export default CourseCard;

//****************************completed course card**************************

export const CompletedCourseCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-slate-50 w-80 h-[400px] p-4 shadow-md rounded-2xl mb-10">
            <img src={thumbnail} alt={''} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-xl text-black font-medium mb-2 max-h-24 truncate overflow-hidden">{title}</h3>
            <p className="text-gray-700 mb-2 font-normal text-lg mt-4">by <span className='font-semibold'>{instructor}</span></p>
            <div className='flex justify-between'>
                <button
                    onClick={() => {
                        navigate(`/course/${id}`);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg mt-10">
                    View
                </button>
            </div>
        </div>
    );
};

//****************************dashboard course card**************************

export const DashboardCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const [markComplete, setMarkComplete] = useState([]);

    //handle mark complete
    const handleMarkComplete = async () => {
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/markComplete/${id}`, {}, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                toast.success("You marked this course as complete.")
                location.reload();
            }
        } catch (error) {
            console.log(error);
            toast.error("Already marked as complete.")
        }
    }

    return (
        <div className="bg-slate-50 flex items-center border p-4 mb-4">
            <div className="flex-shrink-0 w-96 h-56">
                <img src={thumbnail} alt={''} className="ml-4 w-full h-full object-cover rounded-md" />
            </div>
            <div className="ml-20">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 w-3/4 mb-4">Instructor: <span className='text-black font-bold'>{instructor}</span></p>
                <p className="text-gray-700 mb-2 w-3/4 text-lg text-justify">{description}</p>
                {/* <p className="text-black text-xl font-bold mb-4">{`₹ ${price}`}</p> */}
                {/* <p className="text-black mb-4">Enrollment: <span className='text-black font-semibold'>{enrollment_status}</span></p> */}

                <div className="mb-4">
                    <button
                        onClick={handleMarkComplete}
                        className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
                    >
                        Mark as complete
                    </button>
                </div>

                <button
                    onClick={() => {
                        navigate(`/course/${id}`);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-md">
                    View
                </button>
            </div>
        </div>
    );
};

//****************************courses page course card**************************

export const CoursesCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-50 flex flex-col md:flex-row items-center border p-4 mb-4">
            <div className="md:flex-shrink-0 md:w-96 h-56 mb-4 md:mb-0">
                <img src={thumbnail} alt={''} className="ml-4 w-full h-full object-cover rounded-md" />
            </div>
            <div className="md:ml-6">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 mb-4">Instructor: <span className='text-black font-bold'>{instructor}</span></p>
                <p className="text-gray-700 mb-4 text-lg text-justify">{description}</p>
                <p className="text-black text-xl font-bold mb-4">{`₹ ${price}`}</p>
                <p className="text-black mb-4">Enrollment: <span className='text-black font-semibold'>{enrollment_status}</span></p>

                <button
                    onClick={() => {
                        navigate(`/course/${id}`);
                    }}
                    className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-md">
                    View
                </button>
            </div>
        </div>

    )
}

//****************************homepage course card**************************

export const HomeCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {

    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col justify-between bg-slate-50 w-80 h-[400px] p-4 shadow-md rounded-2xl mb-10 transform transition-transform hover:scale-105 cursor-pointer"
            onClick={() => {
                navigate(`/course/${id}`);
            }}
        >
            <div className='flex flex-col'>
                <img src={thumbnail} alt={''} className="w-full h-40 object-cover mb-4 rounded-md" />
                <h3 className="text-lg text-black font-medium mb-1 max-h-24 truncate overflow-hidden">{title}</h3>
                <p className="text-gray-700 mb-2 font-normal text-sm ">by <span className='font-semibold'>{instructor}</span></p>
                <p className="text-sm text-black mb-2 max-h-24 overflow-hidden">{description}</p>
            </div>

            <div className='flex flex-col'>
                <p className="text-black mb-4">Enrollment: <span className='text-black font-semibold'>{enrollment_status}</span></p>
            </div>
        </div>
    );
};