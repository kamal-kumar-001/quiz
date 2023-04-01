
export default async function handler(req, res) {
    try {
      // Remove the token cookie from the browser
      res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`);
  
      // Send a response indicating that the user has been signed out
      res.status(200).json({ message: 'You have been signed out.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to sign out.' });
    }
  }
  