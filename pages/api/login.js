import User from '../../Models/User';
import connectDb from '../../middleware/mongoose';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        // Return error if user not found
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password to hashed password
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        // Return error if passwords don't match
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign({ userId: user._id }, 'secretKey', {
        expiresIn: '7d'
      });

      // Return success with token
      res.status(200).json({ token });
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
