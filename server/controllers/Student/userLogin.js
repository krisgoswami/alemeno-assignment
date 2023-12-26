import jwt from 'jsonwebtoken';
import { User } from '../models/studentModel.js';

// *********user login*********

export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: "please fill all fields",
                success: false,
            });
        };

        //validation to check if credentials are correct
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(403).send({
                message: "Email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "user" }, process.env.SECRET, { expiresIn: "1d" });
        res.status(200).send({
            message: "successfully logged in",
            success: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}