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
        const cardWidth = 350; //adjust as per card width
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
            {/* Welcome Section */}
            <div className='relative bg-gray-200 h-96 flex flex-col justify-center mb-8 p-5 sm:p-10 md:p-20 mt-14'>
                <img src='../src/assets/images/background.jpg' alt='Background' className='absolute inset-0 w-full h-full object-cover' />
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <h2 className='absolute text-white text-xl sm:text-lg md:text-xl lg:text-2xl xl:text-3xl inset-0 mb-10 sm:mb-10 flex items-center justify-center z-30'>Welcome to Alemeno Courses</h2>
                <p className='absolute text-white text-base sm:text-sm md:text-md lg:text-md xl:text-xl inset-0 mt-10 sm:mt-10 flex items-center justify-center text-center z-30'>
                    Explore a wide range of courses to enhance your knowledge and skills. Start your learning journey with Alemeno Courses.
                </p>
            </div>





            {/* Image Slider */}
            <div className='p-5'>
                <ImageSlider />
            </div>

            {/* Scroll Buttons */}
            <div className="hidden sm:flex w-full absolute z-10 justify-between mt-72">
                <button onClick={() => handleScroll('left')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="../src/assets/images/la.svg" alt="left arrow" />
                </button>
                <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="../src/assets/images/ra.svg" alt="right arrow" />
                </button>
            </div>

            {/* Section for Courses */}
            <div className='bg-gray-200'>
                <div className='flex justify-between'>
                    <p className='font-bold text-xl pt-10 pl-4 sm:pl-10'>Featured courses</p>
                    <p
                        onClick={() => {
                            navigate(`/courses`);
                        }}
                        className='font-semibold text-md text-blue-500 hover:underline cursor-pointer pt-10 pr-4 sm:pr-10'
                    >
                        See all courses
                    </p>
                </div>
                <div id="groundContainer" className="flex mx-2 sm:mx-16 my-8 overflow-x-auto sm:overflow-hidden justify-between relative">
                    <div className="flex justify-between my-5 gap-2 sm:gap-8" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                        {randomizedCourses?.slice(0, 6).map((course) => (
                            <div key={course._id} className='mb-8 sm:mb-0'>
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