import User from "../../Models/User";
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ users: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const user = await new User({
          name: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
        }).save();
        res.status(200).json({ message: "User created successfully" });
      } catch (error) {
        res.status(400).json({  message: "Something went Wrong" });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ message: "User updated successfully", data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ message: "User deleted successfully" });
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
