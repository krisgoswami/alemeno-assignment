import { Course } from "../../models/courseModel";

// *********create course*********

export const createCourse = async (req, res) => {
    try {
        const { syllabus, ...restOfCourseData } = req.body;
        const course = new Course({
            ...restOfCourseData,
            syllabus: JSON.parse(syllabus),
        });
        await course.save();
        res.status(200).send({
            message: "Course created successfully",
            success: true,
            course,
            courseId: course.id,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error creating course',
            success: false,
            error,
        });
    }
}