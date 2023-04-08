import React from 'react';
import Admin from '../../components/Admin';
import { hasToken } from '../../middleware/checkUser'


export default function AdminPage({ quizzes}) {
  return <Admin quizzes={quizzes} />;
}



export async function getServerSideProps(context) {
  const { req } = context
  const headers = req.headers;
  const token = await hasToken(context.req)
  if(!token){
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://quiz-mrnormal128-gmailcom.vercel.app';  // Replace with your API endpoint URL
  // const response = await fetch(`${apiUrl}/api/quiz`, {
  //   headers: headers,
  // });
  const response = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz`, {
    headers: headers,
  });
  const data = await response.json();
  return {
    props: {
      quizzes: data?.quizzes || null,
    },
  };
}



