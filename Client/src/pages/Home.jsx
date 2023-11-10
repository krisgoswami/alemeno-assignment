import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import ImageSlider from '../components/ImageSlider'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { HomeCard } from '../components/CourseCard';

const Home = () => {
    const [courses, setCourses] = useState([]);
    const [randomizedCourses, setRandomizedCourses] = useState([]);
    const navigate = useNavigate();

    const getCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/courses`);
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourses();
    }, []);

    useEffect(() => {
        const shuffledCourses = courses.slice().sort(() => Math.random() - 0.5);
        setRandomizedCourses(shuffledCourses);
    }, [courses]);

    //for scrollable course list
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350; // Adjust this value based on your card width
        const totalWidth = courses.length * cardWidth;
        const maxScroll = totalWidth - container.offsetWidth;

        if (direction === 'left') {
            setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0));
        } else if (direction === 'right') {
            setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll));
        }
    };

    return (
        <div className='relative'>
            <div className='bg-gray-200 h-96 flex flex-col justify-center mb-8 p-10 mt-14'>
                <h2 className='text-3xl font-semibold mb-4 text-center'>Welcome to Alemeno Courses</h2>
                <p className='text-lg text-center'>
                    Explore a wide range of courses to enhance your knowledge and skills. Start your learning journey with Alemeno Courses.
                </p>
            </div>

            <div className='p-5'>
                <ImageSlider />
            </div>

            {/* Scroll Buttons */}
            <div className="flex w-full absolute z-10 justify-between mt-72">
                <button onClick={() => handleScroll('left')} className=" text-white m-1 rounded-full">
                    <img className='w-10' src="../src/assets/images/la.svg" alt="left arrow" />
                </button>
                <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="../src/assets/images/ra.svg" alt="right arrow" />
                </button>
            </div>


            {/* Different Sections for Courses */}
            <div className='bg-gray-200'>
                <div className='flex justify-between'>
                    <p className='font-bold text-xl pt-10 pl-10'>Featured courses</p>
                    <p
                        onClick={() => {
                            navigate(`/courses`);
                        }}
                        className='font-semibold text-md text-blue-500 hover:underline cursor-pointer pt-10 pr-10'
                    >
                        See all courses
                    </p>
                </div>
                <div id="groundContainer" className="flex mx-4 sm:mx-16 my-8 overflow-x-auto justify-between relative">
                    <div className="flex justify-between my-5 gap-8" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                        {randomizedCourses?.slice(0, 6).map((course) => (
                            <div key={course._id} className='mb-8'>
                                <HomeCard
                                    id={course?._id}
                                    title={course?.title}
                                    instructor={course?.instructor}
                                    description={course?.description}
                                    price={course?.price}
                                    enrollment_status={course?.enrollment_status}
                                    thumbnail={course?.thumbnail}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;