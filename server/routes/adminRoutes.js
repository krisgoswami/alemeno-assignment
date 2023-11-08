import express from 'express';
import { adminLogin, createAdmin, createCourse, deleteCourse, getCourse, getCourses, updateCourse } from '../controllers/adminController.js';
import { authenticateJwt } from '../utils/jwtAuth.js';

const router = express.Router();

router.post('/signup', createAdmin);
router.post('/login', adminLogin);
router.post('/createCourse', authenticateJwt, createCourse);
router.get('/getCourses', authenticateJwt, getCourses);
router.get('/getCourse/:id', authenticateJwt, getCourse);
router.put('/update/:id', authenticateJwt, updateCourse);
router.delete('/delete/:id', authenticateJwt, deleteCourse);

export default router;