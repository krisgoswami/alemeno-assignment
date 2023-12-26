import { Course } from "../../models/courseModel";

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