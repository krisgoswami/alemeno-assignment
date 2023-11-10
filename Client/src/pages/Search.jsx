import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import CourseCard from '../components/CourseCard';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const getResults = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/search`, {
                params: { q: query }, //passing the search query as a parameter 
            });
            if (data.success) {
                setSearchResults(data.courses);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);  //set loading to false when data is loaded
        }
    }
    useEffect(() => {
        getResults();
    }, [query]);

    return (
        <div className="container mx-auto py-8 h-screen mt-20">
            <h2 className="text-3xl font-bold mb-10">Search Results for "{query}"</h2>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <div className='flex'>
                        {searchResults?.map((course) => (
                            <div key={course?._id} className="mx-10 mt-4">
                                <CourseCard
                                    id={course?._id}
                                    title={course?.title}
                                    description={course?.description}
                                    price={course?.price}
                                    thumbnail={course?.thumbnail}
                                />
                            </div>
                        ))}
                        {searchResults.length === 0 &&
                            <p>There are no results to show for "{query}"</p>
                        }
                    </div>
                </>
            )}

        </div>
    );
}

export default Search;