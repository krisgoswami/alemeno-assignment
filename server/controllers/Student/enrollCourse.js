import { Course } from "../../models/courseModel";
import { User } from "../../models/studentModel";

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