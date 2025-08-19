import mongoose from 'mongoose';

const LessonSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  lessons: [LessonSchema],
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
