import mongoose from "mongoose";
import { userSchema } from "./studentModel.js";

const courseSchema = new mongoose.Schema({
    title: String,
    instructor: String,
    description: String,
    price: Number,
    enrollment_status: String,
    thumbnail: String,
    schedule: String,
    location: String,
    prerequisites: [String],
    syllabus: [String],
    students: [userSchema],
    published: Boolean,
});

export const Course = mongoose.model("Course", courseSchema);