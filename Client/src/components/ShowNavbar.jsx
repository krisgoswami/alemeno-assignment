import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowNavbar = ({ children }) => {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        // console.log(location);
        if (location.pathname === '/login') {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        // console.log(showNavbar);
    }, [location])
    return (
        <div>{showNavbar && children}</div>
    )
}

export default ShowNavbar