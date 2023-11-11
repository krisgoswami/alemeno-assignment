import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/helper';
import CourseCard, { CompletedCourseCard } from '../components/CourseCard';

const EnrolledCourses = () => {

    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const getPurchasedCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/enrolledCourses`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setPurchasedCourses(data.enrolledCourses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getCompletedCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/completedCourses`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setCompletedCourses(data.completedCourses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPurchasedCourses();
        getCompletedCourses();
    }, []);

    //filtering courses that are not marked as completed
    const enrolledCoursesWithoutCompleted = purchasedCourses.filter(course =>
        !completedCourses.some(completedCourse => completedCourse._id === course._id)
    );


    return (
        <div className="flex flex-col h-full p-4 mt-10">
            <h2 className="text-3xl font-bold mb-6 md:mb-10 ml-4 md:ml-10">Student Dashboard</h2>
            <h2 className="text-xl font-semibold mb-2 md:mb-4 ml-4 md:ml-10">Enrolled</h2>
            <div className='flex flex-col md:flex-row flex-wrap justify-start'>
                {enrolledCoursesWithoutCompleted?.map((course) =>
                    <div key={course?._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-4 md:mx-10 mt-4">
                        <CourseCard
                            id={course?._id}
                            title={course?.title}
                            instructor={course?.instructor}
                            thumbnail={course?.thumbnail}
                        />
                    </div>
                )}
            </div>
            {completedCourses.length !== 0 &&
                <h2 className="text-xl font-semibold mb-2 md:mb-4 mt-5 ml-4 md:ml-10">Completed</h2>
            }
            <div className='flex flex-col md:flex-row flex-wrap'>
                {completedCourses?.map((course) =>
                    <div key={course?._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-4 md:mx-10 mt-4">
                        <CompletedCourseCard
                            id={course?._id}
                            title={course?.title}
                            instructor={course?.instructor}
                            thumbnail={course?.thumbnail}
                        />
                    </div>
                )}
            </div>
            {purchasedCourses.length === 0 &&
                <p className="text-xl font-medium mx-4 md:mx-10 mb-4">Your enrolled courses will show here</p>
            }
        </div>

    )
}

export default EnrolledCourses;