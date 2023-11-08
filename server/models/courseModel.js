import mongoose from "mongoose";
import { syllabusSchema } from "./syllabusModel.js";

const courseSchema = new mongoose.Schema({
    title: String,
    instructor: String,
    description: String,
    price: Number,
    enrollment_status: String,
    thumbnail: String,
    duration: String,
    schedule: String,
    location: String,
    prerequisites: [String],
    syllabus: [syllabusSchema],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    published: Boolean,
});

export const Course = mongoose.model("Course", courseSchema);