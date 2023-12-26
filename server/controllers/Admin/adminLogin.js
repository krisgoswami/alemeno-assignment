import { Admin } from "../../models/adminModel";
import jwt from 'jsonwebtoken';

// *********admin login*********

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: 'fill all fields',
                success: false,
            });
        }

        //validation to check if credentials are correct
        const admin = await Admin.findOne({ email, password });
        if (!admin) {
            return res.status(400).send({
                message: "email or password incorrect",
                success: false,
            });
        }
        const token = jwt.sign({ email, role: "admin" }, process.env.SECRET, { expiresIn: '1d' });
        res.status(200).send({
            message: "Login successful",
            success: true,
            admin,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error logging in',
            success: false,
            error,
        });
    }
}