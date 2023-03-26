import connectDb from '../../../middleware/mongoose';
import Quiz from '../../../models/Quiz';


const handler = async (req, res) => {
    const { slug  } = req.query;
  const quiz = await Quiz.findOne({ slug });
  
  if (req.method === 'POST' ) {
    try {
      // Find the quiz by its slug
      const quiz = await Quiz.findOne({ slug  });
    
      // Update the quiz's performance using the played() method
      quiz.played();
    
      // Save the quiz
      // await quiz.save();
    
      // Return a success message
      return res.status(200).json({ message: 'Quiz submitted successfully' });
    } catch (err) {
      // Return an error message if there's an error
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (quiz?.isPublic) {
    return res.status(200).json({ quiz  });
  }
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  return res.status(404).json({ message: 'Quiz not found' });
}
export default connectDb(handler)

