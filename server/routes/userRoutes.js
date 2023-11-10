import express from 'express';
import { completedCourse, completedCourses, createUser, enrollCourse, enrolledCourses, getCourse, getCourses, searchCourses, userDetails, userLogin, userProfile } from '../controllers/studentController.js';
import { authenticateJwt } from '../utils/jwtAuth.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', userLogin);
router.get('/profile/:id', authenticateJwt, userDetails);
router.put('/profile/:id', authenticateJwt, userProfile);
router.get('/courses', getCourses);
router.get('/course/:id', getCourse);
router.get('/search', searchCourses);
router.post('/enroll/:id', authenticateJwt, enrollCourse);
router.get('/enrolledCourses', authenticateJwt, enrolledCourses);
router.get('/completedCourses', authenticateJwt, completedCourse);
router.post('/markComplete/:id', authenticateJwt, completedCourses);

export default router;