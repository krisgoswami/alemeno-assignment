import mongoose from "mongoose";

export const syllabusSchema = new mongoose.Schema({
    week: Number,
    topic: String,
    content: String,
});

export const Syllabus = mongoose.model("Syllabus", syllabusSchema);