import express from 'express';
import { authenticateJwt } from '../utils/jwtAuth.js';
import { createAdmin } from '../controllers/Admin/createAdmin.js';
import { adminLogin } from '../controllers/Admin/adminLogin.js';
import { createCourse } from '../controllers/Admin/createCourse.js';
import { getCourses } from '../controllers/Admin/getCourses.js';
import { getCourse } from '../controllers/Admin/getCourse.js';
import { updateCourse } from '../controllers/Admin/updateCourse.js';
import { deleteCourse } from '../controllers/Admin/deleteCourse.js';

const router = express.Router();

router.post('/signup', createAdmin); //admin signup
router.post('/login', adminLogin); //admin login
router.post('/createCourse', authenticateJwt, createCourse); //create course
router.get('/getCourses', authenticateJwt, getCourses); //get all courses
router.get('/getCourse/:id', authenticateJwt, getCourse); // get course by id
router.put('/update/:id', authenticateJwt, updateCourse); //update an existing course
router.delete('/delete/:id', authenticateJwt, deleteCourse); //delete a course

export default router;