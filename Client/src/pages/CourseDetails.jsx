import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CourseDetails = () => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const id = useParams().id;
    const [inputs, setInputs] = useState({});
    const [course, setCourse] = useState({});
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCoursePurchased, setIsCoursePurchased] = useState(false);

    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');


    //logic to get item details
    const getCourseDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/course/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                const course = data?.course;
                setCourse(course);
                setInputs({
                    title: course.title,
                    instructor: course.instructor,
                    description: course.description,
                    price: course.price,
                    enrollment_status: course.enrollment_status,
                    thumbnail: course.thumbnail,
                    duration: course.duration,
                    schedule: course.schedule,
                    location: course.location,
                    prerequisites: course.prerequisites,
                    syllabus: course.syllabus,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    //logic to get completed courses
    const getEnrolledCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/enrolledCourses`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setIsCoursePurchased(data.enrolledCourses.some(course => course._id === id));
                console.log(isCoursePurchased)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCourseDetails();
        getEnrolledCourses();
    }, []);

    //to check if user is logged in or not and is course purchased or not
    const authCheck = () => {
        if (isLogin) {
            console.log(isCoursePurchased);
            if (!isCoursePurchased) {
                navigate(`/enroll/${id}`);
            } else {
                toast("You have already purchased this course", {
                    icon: '⚠️',
                });
            }
        } else {
            toast("You need to login to purchase", {
                icon: '⚠️',
            });
            navigate('/login');
        }
    }

    //syllabus expand button
    const toggleSyllabus = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-full p-4 mt-20 flex flex-col items-start md:flex-row md:ml-52">
            {/* Product Image */}
            <div className="w-full md:w-2/5 pr-8 mb-4 md:mr-10">
                <img
                    src={inputs.thumbnail}
                    alt="Product"
                    className="w-full h-auto rounded-lg"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2">
                <div className="border border-gray-300 p-6 rounded-lg mb-4 shadow-md">
                    <div className="flex flex-col">
                        <h1 className="text-3xl max-w-3xl font-semibold mb-2">{inputs.title}</h1>
                        <h1 className="text-xl text-gray-700 font-semibold mb-4">by {inputs.instructor}</h1>
                        <div className="text-xl font-bold mb-5">₹ {inputs.price}</div>
                        <p className="text-lg max-w-2xl text-justify text-gray-700 mb-4">{inputs.description}</p>
                    </div>
                    <div>
                        <p className="text-black mb-4">Enrollment: <span className='text-black font-semibold'>{inputs.enrollment_status}</span></p>
                        <button
                            onClick={authCheck}
                            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
                <div className="border border-gray-300 p-6 rounded-lg mb-4 shadow-md">
                    <div className="mb-4">
                        <label className="text-black text-lg font-semibold">Duration:</label>
                        <p className='text-black'>{inputs.duration}</p>
                    </div>
                    <div className='mb-4'>
                        <label className="text-black text-lg font-semibold">Requirements:</label>
                        {inputs.prerequisites?.map((req, index) =>
                            <div key={index} className="">
                                <p className='text-black'>- {req}</p>
                            </div>
                        )}
                    </div>
                    <div className='mb-4'>
                        <label className="text-black text-lg font-semibold">Syllabus:</label>
                        <button
                            className="ml-2 text-white focus:outline-none"
                            onClick={toggleSyllabus}
                        >
                            {isExpanded ? <div className='ml-10 px-2 bg-cyan-500 text-white text-sm font-bold rounded-md align-middle items-center'>Collapse</div> : <div className='ml-10 px-2 bg-cyan-500 hover:bg-cyan-700 text-white text-sm font-bold rounded-md align-middle items-center'>Expand</div>}
                        </button>
                        {isExpanded && (
                            <div>
                                {inputs.syllabus?.map((item, index) =>
                                    <div key={index} className="mb-3">
                                        <p className='text-black ml-2 font-medium'>Week:
                                            <span className='text-black font-normal ml-2'>{item.week}</span>
                                        </p>
                                        <p className='text-black ml-4 font-medium'>Topic:
                                            <span className='text-black font-normal ml-2'>{item.topic}</span>
                                        </p>
                                        <p className='text-black ml-4 font-medium'>Content:
                                            <span className='text-black font-normal ml-2'>{item.content}</span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className='mb-4'>
                        <label className="text-black text-lg font-semibold">Schedule:</label>
                        <p className='text-black'>{inputs.schedule}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CourseDetails;