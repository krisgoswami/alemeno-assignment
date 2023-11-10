import express from 'express';
import { completedCourse, completedCourses, createUser, enrollCourse, enrolledCourses, getCourse, getCourses, searchCourses, userDetails, userLogin, userProfile } from '../controllers/studentController.js';
import { authenticateJwt } from '../utils/jwtAuth.js';

const router = express.Router();

router.post('/signup', createUser); //user registration
router.post('/login', userLogin); //user login
router.get('/profile/:id', authenticateJwt, userDetails); //get user details
router.put('/profile/:id', authenticateJwt, userProfile); //update user details
router.get('/courses', getCourses); //get courses
router.get('/course/:id', getCourse); //get course by id
router.get('/search', searchCourses); //search for courses
router.post('/enroll/:id', authenticateJwt, enrollCourse); //enroll for a course
router.get('/enrolledCourses', authenticateJwt, enrolledCourses); //get enrolled courses
router.get('/completedCourses', authenticateJwt, completedCourse); //get courses that are marked as completed
router.post('/markComplete/:id', authenticateJwt, completedCourses); //mark a course as completed

export default router;