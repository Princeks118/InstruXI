import mongoose from "mongoose";

const lecturesProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date,
});

const courseProgressSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  completed: Boolean,
  completionDate: Date,
  lecturesProgress: [lecturesProgressSchema],
}, { timestamps: true });

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
