import { Course } from "../../models/courseModel";


// *********update course*********


export const updateCourse = async (req, res) => {
    try {
        const { syllabus, ...restOfCourseData } = req.body;
        const course = await Course.findByIdAndUpdate(req.params.id, {
            ...restOfCourseData,
            syllabus: JSON.parse(syllabus),
        }, { new: true });
        if (!course) {
            return res.status(404).send({
                message: "Course not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Course updated succefully",
            success: true,
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating course',
            success: false,
            error,
        });
    }
}