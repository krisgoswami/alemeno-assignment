import { Course } from "../../models/courseModel";

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