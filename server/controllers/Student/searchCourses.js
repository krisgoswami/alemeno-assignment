import { Course } from "../../models/courseModel";

// *********search courses*********

export const searchCourses = async (req, res) => {
    const searchQuery = req.query.q;
    try {
        const courses = await Course.find({
            $or: [
                { title: { $regex: new RegExp(searchQuery, 'i') } },
                { instructor: { $regex: new RegExp(searchQuery, 'i') } },
                { description: { $regex: new RegExp(searchQuery, 'i') } },
            ]
        });
        res.status(200).send({
            success: true,
            courseCount: courses.length,
            courses,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: 'No items found',
            success: false,
            error,
        });
    }
}