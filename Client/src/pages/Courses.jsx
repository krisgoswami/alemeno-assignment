import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { CoursesCard } from '../components/CourseCard';


const Courses = () => {

    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(4); //default value of items per page

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

    // Calculate the index of the first and last item on the current page
    const indexOfLastCourse = currentPage * itemsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='flex flex-col h-full p-4 mt-5'>
            <div className="mx-4 mb-4 md:mx-10 md:mb-4">
                <label className="block text-gray-700 mb-2">Courses per page:</label>
                <input
                    type="number"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="w-32 border border-gray-300 rounded px-4 py-2"
                />
            </div>
            {currentCourses?.map((course) =>
                <div key={course?._id} className="mx-4 md:mx-10 mt-4">
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

            {/* Pagination controls */}
            <div className="mt-4 mx-4 md:mx-10">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastCourse >= courses.length}
                    className="px-4 py-2 mb-5 border border-gray-300 rounded"
                >
                    Next
                </button>
            </div>
        </div>

    )
}

export default Courses;