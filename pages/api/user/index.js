import User from "../../../Models/User";
import connectDb from '../../../middleware/mongoose';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const user = await new User({
        name: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      }).save();
      res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      res.status(400).json({ message: "Something went Wrong" });
    }
  } else {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export default connectDb(handler);
