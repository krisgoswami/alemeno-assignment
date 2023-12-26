import express from 'express';
import { authenticateJwt } from '../utils/jwtAuth.js';
import { createUser } from '../controllers/Student/createUser.js';
import { userLogin } from '../controllers/Student/userLogin.js';
import { userDetails } from '../controllers/Student/userDetails.js';
import { userProfile } from '../controllers/Student/userProfile.js';
import { getCourses } from '../controllers/Student/getCourses.js';
import { getCourse } from '../controllers/Student/getCourse.js';
import { enrollCourse } from '../controllers/Student/enrollCourse.js';
import { enrolledCourses } from '../controllers/Student/enrolledCourses.js';
import { markCourseComplete } from '../controllers/Student/markCourseComplete.js';
import { completedCourses } from '../controllers/Student/completedCourses.js';
import { searchCourses } from '../controllers/Student/searchCourses.js';

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
router.get('/completedCourses', authenticateJwt, completedCourses); //get courses that are marked as completed
router.post('/markComplete/:id', authenticateJwt, markCourseComplete); //mark a course as completed

export default router;