import jwt from 'jsonwebtoken';
import { User } from '../models/studentModel.js';
import { Course } from '../models/courseModel.js';


// *********user registration*********

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //validations
        if (!name || !email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists",
                success: false,
            });
        };

        //save user to database
        const user = new User({
            name: name,
            email: email,
            password: password,
        });
        await user.save();

        //create token upon sign up
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: '1d' });
        return res.status(200).send({
            message: "User registered successfully",
            success: true,
            user,
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering user',
            success: false,
            error,
        });
    }
}

// *********user login*********

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //validation to check if credentials are correct
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(403).send({
                message: "Email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: "1d" });
        res.status(200).send({
            message: "successfully logged in",
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}

// *********get all courses*********

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ published: true });
        if (!courses) {
            return res.status(400).send({
                message: "No courses found",
                success: false,
            });
        }
        res.status(200).send({
            success: true,
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Something went wrong',
            success: false,
            error,
        });
    }
}

// *********get course by id*********

export const getCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        res.status(200).send({
            success: true,
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No course found',
            success: false,
            error,
        });
    }
}

// *********enroll for a course*********

export const enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        if (course) {
            const user = await User.findOne({ email: req.user.email });
            // console.log(user);
            // console.log(course);

            if (user) {
                user.enrolledCourses.push(course);
                await user.save();
                res.status(200).send({
                    message: "Course purchased successfully",
                    success: true,
                    user,
                });
                course.students.push(user);
                await course.save();
            }
            else {
                return res.status(403).send({
                    message: "User not found",
                    success: false,
                });
            }

        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'Course not found',
            success: false,
            error,
        });
    }
}

// *********retrieve enrolled courses*********

export const enrolledCourses = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate('enrolledCourses');

        if (user) {
            res.status(200).send({
                enrolledCourses: user.enrolledCourses || [],
                success: true,
            });
        } else {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No courses found',
            success: false,
            error,
        });
    }
}

// *********mark course as completed*********

export const completedCourses = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        const user = await User.findOne({ email: req.user.email }).populate('enrolledCourses');

        if (user) {
            if (user.enrolledCourses.includes(courseId)) {
                user.completedCourses.push(course);
                await user.save();
                res.status(200).send({
                    message: "Course marked as completed",
                    success: true,
                    user,
                });
            } else {
                return res.status(400).send({
                    message: "User not enrolled in this course",
                    success: false,
                });
            }
        } else {
            return res.status(400).send({
                message: "User not found",
                success: false,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No courses found',
            success: false,
            error,
        });
    }
}