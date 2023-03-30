import User from '../../../Models/User';
import { verify } from 'jsonwebtoken';
import connectDb from '../../../middleware/mongoose';


const handler = async (req, res) => {
    if (req.method === 'GET') {
      try {
        // Get the user ID from the URL parameters
        const { id } = req.query;
        // Verify the JWT token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = verify(token, 'secretKey');
        const userId = decoded.userId;
  
        // Check that the user ID from the token matches the ID from the URL parameters
        if (userId !== id) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
  
        // Find the user by ID in the database
        const user = await User.findById(id);
  
        if (!user) {
          // Return error if user not found
          return res.status(404).json({ message: 'User not found' });
        }
  
        // Return the user data
        res.status(200).json({ user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      // Return error if request method not supported
      res.status(405).json({ message: 'Method not allowed' });
    }
  };
  
  export default connectDb(handler);
  