import { Course } from "../../models/courseModel";


export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const course = await Course.findByIdAndDelete(courseId);
        if (!course) {
            return res.status(404).send({
                message: "Course not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Course deleted",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error deleting course',
            success: false,
            error,
        });
    }
}