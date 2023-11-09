import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { CoursesCard } from '../components/CourseCard';


const Courses = () => {

    const [courses, setCourses] = useState([]);
    // const token = localStorage.getItem('token');

    const getCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/courses`);
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div className='flex flex-col h-full p-4 mt-20'>
            {courses?.map((course) =>
                <div key={course?._id} className="mx-10 mt-4">
                    <CoursesCard
                        id={course?._id}
                        title={course?.title}
                        instructor={course?.instructor}
                        description={course?.description}
                        price={course?.price}
                        enrollment_status={course?.enrollment_status}
                        thumbnail={course?.thumbnail}
                    />
                </div>
            )}
        </div>
    )
}

export default Courses;