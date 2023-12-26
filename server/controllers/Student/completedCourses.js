import { User } from "../../models/studentModel";

// *********retrieve completed courses*********

export const completedCourses = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate('completedCourses');

        if (user) {
            res.status(200).send({
                completedCourses: user.completedCourses || [],
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