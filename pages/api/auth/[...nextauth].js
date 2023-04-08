import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../Models/User';
import connectDb from '../../../middleware/mongo';

const NEXTAUTH_SECRET = "hgcjytfuytdyrcdfyjfxhgfjfhdf"
// const secret = process.env.NEXTAUTH_SECRET || "hgcjytfuytdyrcdfyjfxhgfjfhdf"
export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
 async authorize(credentials, req) {
        await connectDb();
        // Find the user with the given username and password in the MongoDB database
        const { email, password } = credentials;
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

        // Return the user object if found
        return user;
      },
    }),
  ],
  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    // This could be avatars, role, display name, etc...
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          role: user.role,
          // user: user,
          name: user.name,
        }
      }
      return token
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user
      }
      return session
    }
  },
  pages: {
    // Here you can define your own custom pages for login, recover password, etc.
    signIn: '/login', // we are going to use a custom login page (we'll create this in just a second)
  },
});

