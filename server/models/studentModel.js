import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ]
})

export const Student = mongoose.model("Student", studentSchema);