import express from 'express';
import { adminLogin, createAdmin, createCourse, deleteCourse, getCourse, getCourses, updateCourse } from '../controllers/adminController.js';
import { authenticateJwt } from '../utils/jwtAuth.js';

const router = express.Router();

router.post('/signup', createAdmin); //admin signup
router.post('/login', adminLogin); //admin login
router.post('/createCourse', authenticateJwt, createCourse); //create course
router.get('/getCourses', authenticateJwt, getCourses); //get all courses
router.get('/getCourse/:id', authenticateJwt, getCourse); // get course by id
router.put('/update/:id', authenticateJwt, updateCourse); //update an existing course
router.delete('/delete/:id', authenticateJwt, deleteCourse); //delete a course

export default router;