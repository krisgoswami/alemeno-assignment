import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Courses from './pages/Courses';
import Search from './pages/Search';
import CourseDetails from './pages/CourseDetails';
import Purchase from './pages/Purchase';
import EnrolledCourses from './pages/EnrolledCourses';
import ProfilePage from './pages/ProfilePage';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/search" element={<Search />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/enroll/:id" element={<Purchase />} />
            <Route path="/enrolledCourses" element={<EnrolledCourses />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </>
  )
}

export default App;
