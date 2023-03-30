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
          selectedCount: {
            type: Number,
            default: 0,
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

QuizSchema.methods.played = async function(answers) {
  this.performance += 1;
  for (let i = 0; i < answers.length; i++) {
    const { questionId, optionValue } = answers[i];
    const questionIndex = this.questions.findIndex(q => q._id.equals(questionId));
    if (questionIndex !== -1) {
      const optionIndex = this.questions[questionIndex].options.findIndex(o => o.text === optionValue);
      if (optionIndex !== -1) {
        const option = this.questions[questionIndex].options[optionIndex];
        option.selectedCount += 1;
      }
    }
  }
  await this.save();
};

mongoose.models = {};
export default mongoose.model('Quiz', QuizSchema);
