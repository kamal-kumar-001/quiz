import Quiz from "../../models/Quiz";
import connectDb from "../../middleware/mongoose";
import { verify } from 'jsonwebtoken';
const handler = async (req, res) => {
  const { method } = req;
  function generateSlug(title) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .join('-');
    const timestamp = Date.now().toString(36);
    return `${slug}-${timestamp}`;
  }
  switch (method) {
    case "GET":
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = verify(token, 'secretKey');
        const userId = decoded.userId;
        const quizzes = await Quiz.find({ user: userId }).sort({
          position: 1,
        });
        res.status(200).json({ quizzes: quizzes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = verify(token, 'secretKey');
        const userId = decoded.userId; // extract the user ID from the token
        const quiz = await new Quiz({
          title: req.body.title,
          slug: generateSlug(req.body.title),
          questions: req.body.questions || [],
          user: userId, // include the user ID in the request
        }).save();
        res.status(200).json({ message: "Created successfully" });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const quiz = await Quiz.findOneAndUpdate(
          { _id: id, user: req.user._id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if (!quiz) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ data: quiz });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = verify(token, 'secretKey');
        const userId = decoded.userId;
        const deletedQuiz = await Quiz.findOneAndDelete({
          _id: id,
          user: userId,
        });
        if (!deletedQuiz) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ message: "Deleted successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default connectDb(handler);
