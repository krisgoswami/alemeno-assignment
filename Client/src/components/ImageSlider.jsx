import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = () => {
    const carouselStyle = {
        width: '60%',
        margin: 'auto auto',
        overflow: 'hidden',
        borderRadius: '8px',
        border: '0px solid black',
    };

    const imageStyle = {
        height: '600px',
        objectFit: 'cover',
        width: '100%',
    };

    const [courses, setCourses] = useState([]);
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

    return (
        <center>
            <div style={carouselStyle}>
                <Carousel
                    showThumbs={false}
                    swipeable={true}
                    showArrows={true}
                    autoPlay={true}
                    emulateTouch={true}
                    showStatus={false}
                    swipeScrollTolerance={50}
                    useKeyboardArrows={true}
                    infiniteLoop={true}
                >
                    {courses?.map((item, index) => (
                        <div key={index}>
                            <img src={item.thumbnail} alt={`Image ${index + 1}`} style={imageStyle} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </center>
    );
};

export default ImageSlider;
