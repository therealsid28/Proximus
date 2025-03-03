import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  role: {
    type: String,
    enum: ['organizer', 'user'],
    defualt: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('User', userSchema);
