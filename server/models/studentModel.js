import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
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
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    completedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ]
})

export const User = mongoose.model("User", userSchema);