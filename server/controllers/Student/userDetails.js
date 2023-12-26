import { User } from '../models/studentModel.js';

// *********get user details*********
export const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).send({
                message: "User found",
                success: true,
                user,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error ',
            success: false,
            error,
        });
    }
}