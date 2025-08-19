import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  progress: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      completedLessons: [Number],
    },
  ],
  badges: [String],
});


export default mongoose.models.User || mongoose.model('User', UserSchema);
