import connectDb from '../../../middleware/mongoose';
import Quiz from '../../../Models/Quiz';
import Template from '../../../Models/Template';


const handler = async (req, res) => {
  const { slug  } = req.query;
  const quiz = await Quiz.findOne({ slug });
  const userId = quiz?.user?.toString();
  const template = await Template.findOne({ user: userId });
  
  
  if (req.method === 'POST' ) {
    try {
      // Find the quiz by its slug
      const { answers } = req.body;
      const quiz = await Quiz.findOne({ slug  });
      
      await quiz.played(answers);
      // Return a success message
      return res.status(200).json({ message: 'Quiz submitted successfully' });
    } catch (err) {
      // Return an error message if there's an error
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (quiz?.isPublic) {
    return res.status(200).json({ quiz , template });
  }
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  return res.status(404).json({ message: 'Quiz not found' });
}
export default connectDb(handler)

