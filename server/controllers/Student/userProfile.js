import { User } from '../models/studentModel.js';

// *********user profile*********
export const userProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send({
                message: "Item not found",
                success: false,
            });
        }
        res.status(200).send({
            message: "Item updated succefully",
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error updating user',
            success: false,
            error,
        });
    }
}