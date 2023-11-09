import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import toast from 'react-hot-toast';

const CourseCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-cyan-200 w-80 max-h-[450px] h-[500px] p-4 shadow-md rounded-2xl">
            <img src={thumbnail} alt={''} className="w-full h-40 object-cover mb-4 rounded-md" />
            <h3 className="text-xl text-black font-medium mb-2 truncate max-h-24 overflow-hidden">{title}</h3>
            <p className="text-gray-700 mb-2 font-normal h-20 ">{description}</p>
            <p className="text-gray-700 mb-2 font-bold text-xl mt-8">₹ <span className='font-semibold'>{price}</span></p>
            <button
                onClick={() => {
                    navigate(`/course/${id}`);
                }}
                className="bg-cyan-500 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg mt-2">
                View
            </button>
        </div>
    );
};

export default CourseCard;

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

export const CoursesCard = ({ id, title, instructor, description, price, enrollment_status, thumbnail }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-50 flex items-center border p-4 mb-4">
            <div className="flex-shrink-0 w-96 h-56">
                <img src={thumbnail} alt={''} className="ml-4 w-full h-full object-cover rounded-md" />
            </div>
            <div className="ml-20">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-gray-700 w-3/4 mb-4">Instructor: <span className='text-black font-bold'>{instructor}</span></p>
                <p className="text-gray-700 mb-2 w-3/4 text-lg text-justify">{description}</p>
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