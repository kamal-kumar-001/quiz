import Quiz from "../../../Models/Quiz";
import connectDb from "../../../middleware/mongoose";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET || 'hgcjytfuytdyrcdfyjfxhgfjfhdf'
const handler = async (req, res) => {
  const { method } = req;
  function generateSlug(title) {
    const slug = title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .join('-');
    const timestamp = Date.now().toString(36);
    return `${slug}${timestamp}`;
  }
  
  // Get the token from next-auth/jwt
  const token = await getToken({ req, secret });
  // console.log(token);

  switch (method) {
    case "GET":
      try {
        const userId = token?.sub; // Extract user ID from token
        const quizzes = await Quiz.find({ user: userId }).sort({
          createdAt: -1,
        });
        res.status(200).json({ quizzes: quizzes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const userId = token?.sub; // Extract user ID from token
        const quiz = await new Quiz({
          title: req.body.title,
          slug: generateSlug(req.body.title),
          questions: req.body.questions || [],
          user: userId, // Include user ID in the request
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
        const userId = token?.sub; // Extract user ID from token
        const quiz = await Quiz.findOneAndUpdate(
          { _id: id, user: userId },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!quiz) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, message: "Quiz Updated successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const userId = token?.sub; // Extract user ID from token
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
