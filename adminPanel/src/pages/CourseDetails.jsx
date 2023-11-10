import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';


const CourseDetails = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const id = useParams().id;
    const [inputs, setInputs] = useState({});
    const [course, setCourse] = useState({});

    const getCourseDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/getCourse/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data?.success) {
                setCourse(data?.course);
                setInputs({
                    title: data?.course.title,
                    instructor: data?.course.instructor,
                    description: data?.course.description,
                    price: data?.course.price,
                    enrollment_status: data?.course.enrollment_status,
                    thumbnail: data?.course.thumbnail,
                    duration: data?.course.duration,
                    schedule: data?.course.schedule,
                    location: data?.course.location,
                    prerequisites: data?.course.prerequisites,
                    syllabus: data?.course.syllabus,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);

    return (
        <div>
            <div className="p-8 mt-20">
                <h2 className="text-2xl font-bold mb-4">Title: {inputs.title}</h2>
                <div className="flex flex-row items-center mb-2">
                    <img
                        src={inputs.thumbnail}
                        className="cursor-pointer"
                        alt={'thumbnail'}
                        style={{ maxWidth: '350px', height: '200px', margin: "2px" }} // Set max width and height for thumbnail
                    />
                </div>
                <p className="text-lg mb-2">Instructor: {inputs.instructor}</p>
                <p className="text-gray-700 mb-8">Description: {inputs.description}</p>
                <p className="text-gray-700 mb-8">Price: ₹ {inputs.price}</p>
                <p className="text-gray-700 mb-8">Enrollment: {inputs.enrollment_status}</p>
                <p className="text-gray-700 mb-8">Duration: {inputs.duration}</p>
                <p className="text-gray-700 mb-8">Schedule: {inputs.schedule}</p>
                <p className="text-gray-700 mb-8">Location: {inputs.location}</p>
                <p className="text-gray-700 mb-3 font-bold">Pre-requisites:</p>
                {inputs.prerequisites?.map((req, index) =>
                    <div key={index} className="mb-2">
                        <p className='text-black'>- {req}</p>
                    </div>
                )}
                <p className="text-gray-700 mb-1 font-bold">Syllabus:</p>
                {inputs.syllabus?.map((item, index) => (
                    <div key={index} className='mb-4'>
                        <p className="text-gray-700 mb-1">Week: {item.week}</p>
                        <p className="text-gray-700 mb-1">Topic: {item.topic}</p>
                        <p className="text-gray-700 mb-1">Content: {item.content}</p>
                    </div>
                ))}

                <button
                    className='bg-cyan-500 text-white px-4 py-2 rounded-full'
                    onClick={() => {
                        navigate(`/update/${id}`);
                    }}
                >Edit</button>
            </div>
        </div>
    )
}

export default CourseDetails;