import React from 'react';
import Admin from '../../components/Admin';
import jwt from 'jsonwebtoken';

export default function AdminPage({ quizzes, user, token }) {
  return <Admin quizzes={quizzes} user={user} token={token} />;
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  let url = req.headers.referer;
  let arr = url.split('/');
  url = `${arr[0]}//${arr[2]}`;
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
      fetch(`${url}/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${url}/api/quiz`, {
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
        quizzes: quizzesData?.quizzes || null,
        token,
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
