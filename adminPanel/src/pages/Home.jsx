import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { useEffect } from 'react';
import { useState } from 'react';
import CourseCard from '../components/CourseCard';

const Home = () => {

    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');

    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/getCourses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log("data is", data);
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, []);

    return (
        <div className='flex flex-wrap justify-around gap-14 mt-20'>
            {courses?.map((course) =>
                <div key={course?._id} className="ml-10 mt-5">
                    <CourseCard
                        id={course?._id}
                        title={course?.title}
                        description={course.description}
                        price={course.price}
                        thumbnail={course?.thumbnail}
                    />
                </div>
            )}
        </div>
    )
}

export default Home;