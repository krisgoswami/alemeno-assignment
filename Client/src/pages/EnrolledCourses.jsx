import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/helper';
import { DashboardCard } from '../components/CourseCard';

const EnrolledCourses = () => {

    const [purchasedCourses, setPurchasedCourses] = useState([]);
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
    useEffect(() => {
        getPurchasedCourses();
    }, [])


    return (
        <div className="flex flex-col h-full p-4 mt-20">
            <h2 className="text-xl font-bold mb-10 ml-10">Dashboard</h2>
            {purchasedCourses?.map((course) =>
                <div key={course?._id} className="mx-10 mt-4">
                    <DashboardCard
                        id={course?._id}
                        title={course?.title}
                        instructor={course?.instructor}
                        thumbnail={course?.thumbnail}
                    />
                </div>
            )}
            {purchasedCourses.length === 0 &&
                <p className="text-xl font-medium mx-10 mb-4">Your enrolled courses will show here</p>
            }
        </div>
    )
}

export default EnrolledCourses;