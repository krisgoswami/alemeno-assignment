import { Course } from "../../models/courseModel";
import { User } from "../../models/studentModel";

// *********mark course as completed*********

export const markCourseComplete = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findById(courseId);
        const user = await User.findOne({ email: req.user.email }).populate('enrolledCourses');

        if (user) {

            //check if the array of objects contains the course id, and since it's an array of objects, it needs to converted to string.
            if (user.completedCourses.some(course => course._id.toString() === courseId)) {
                res.status(400).send({
                    message: "Already marked as completed",
                    success: false,
                    user,
                });
            }
            else if (user.enrolledCourses.some(course => course._id.toString() === courseId)) {
                user.completedCourses.push(course);
                await user.save();
                res.status(200).send({
                    message: "Course marked as completed",
                    success: true,
                    user,
                });
            }
            else {
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