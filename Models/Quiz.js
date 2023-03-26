const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
          },
          explanation: {
            type: String,
          },
        },
      ],
    },
  ],
  performance: {
    type: Number,
    default: 0,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {timestamps: true});

QuizSchema.methods.played = function() {
  this.performance += 1;
  return this.updateOne({ performance: this.performance }).exec();
};

mongoose.models = {};
export default mongoose.model('Quiz', QuizSchema);
