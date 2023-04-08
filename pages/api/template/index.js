import Template from "../../../Models/Template";
import connectDb from "../../../middleware/mongoose";
import { getToken } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET

const handler = async (req, res) => {
  const { method } = req;
  const token = await getToken({ req, secret });

  switch (method) {
    case "GET":
      try {
        const userId = token.user._id;
        const template = await Template.findOne({ user: userId }).sort({
          createdAt: -1,
        });
        if (!template) {
          // If template is not found, send the default response
          res.status(200).json({ template: {
            name: "Untitled",
            mainColor: "#000000",
            textColor: "#000000",
            bgColor: "#ffffff",
            buttonType: "block",
            width: 400,
            height: 500,
            font: "Arial",
            fontSize: 14,
          }});
        } else {
          // If template is found, send the template object
          res.status(200).json({ template });
        }
        // console.log(templates);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const userId = token.user._id; // extract the user ID from the token
        const template = await new Template({
          user: userId, // include the user ID in the request
          name: req.body.name,
        //   description: req.body.description || "",
          mainColor: req.body.mainColor,
          textColor: req.body.textColor,
          backgroundColor: req.body.bgColor,
          buttonType: req.body.buttonType,
          width: req.body.width,
          height: req.body.height,
          font: req.body.font,
          fontSize: req.body.fontSize,
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
        const userId = token.user._id;
        const template = await Template.findOneAndUpdate(
          { _id: id, user: userId },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        if (!template) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, message: "Template Updated successfully" });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const userId = token.user._id;
        const deletedTemplate = await Template.findOneAndDelete({
          _id: id,
          user: userId,
        });
        if (!deletedTemplate) {
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
