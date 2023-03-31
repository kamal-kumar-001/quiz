import Contact from "../../Models/Contact";
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const contacts = await Contact.find({});
        res.status(200).json({ contacts: contacts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const contact = await new Contact({
          name: req.body.name,
          email: req.body.email,
          message: req.body.message,
        }).save();
        res.status(200).json({success: true, message: "Thanks for Contacting US" });
      } catch (error) {
        res.status(400).json({  message: "Something went Wrong" });
      }
      break;

    case "PUT":
      try {
        const { id } = req.query;
        const contact = await Contact.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!contact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ message: "Contact updated successfully", data: contact });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
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
