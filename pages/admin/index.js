import React from 'react'
import Admin from '../../components/Admin'
import jwt from 'jsonwebtoken';
import AdminRoute from '../../components/dashboard/adminRoute';

export default function AdminPage({ quizzes, user }) {
  return (
    <AdminRoute>
      <Admin quizzes={quizzes} user={user} />
    </AdminRoute>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  // console.log(req.cookies)
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const decodedToken = jwt.decode(token);
  const userId = decodedToken?.userId;

  try {
    const [userRes, quizzesRes] = await Promise.all([
      // fetch(`http://localhost:3000/api/user/${userId}`, {
      fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      // fetch('http://localhost:3000/api/quiz', {
      fetch('https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);
    const [userData, quizzesData] = await Promise.all([
      userRes.json(),
      quizzesRes.json(),
    ]);
    return {
      props: {
        user: userData?.user || null,
        quizzes: quizzesData.quizzes,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }
}
