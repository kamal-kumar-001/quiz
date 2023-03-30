const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  subscriptions: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  quizzes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }]
}, {timestamps: true});

// Hash the password before saving
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Compare password to hashed password
UserSchema.methods.comparePassword = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};


mongoose.models = {};
export default mongoose.model('User', UserSchema);
