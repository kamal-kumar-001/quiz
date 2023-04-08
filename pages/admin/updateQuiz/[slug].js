import React from 'react'
import Layout from '../../../components/dashboard/Layout';
import QuizForm from '../../../components/dashboard/QuizForm';
import { hasToken } from '../../../middleware/checkUser'

const UpdateQuizPage = ({quizzes, token}) => {
  return (
    <Layout>
    <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
    <QuizForm mode={'update'} quizzes={quizzes} token={token} />
    </div>
    </Layout>
  )
}


export async function getServerSideProps({ params , req }) {
  const { slug } = params;
  const headers = req.headers;
  const token = await hasToken(req)
  if(!token){
      return {
        redirect: {
          destination: '/login',
              permanent: false
            }
          }
        }
        // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://quiz-mrnormal128-gmailcom.vercel.app';  // Replace with your API endpoint URL
        // const response = await fetch(`${apiUrl}/api/quiz/${slug}`, {
        //   headers: headers,
        // });
        const response = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`, {
          headers: headers,
        });
        
        // const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`);
        const data = await response.json();
  return {
    props: {
      quizzes: data?.quiz || null,
    },
  };
}
export default UpdateQuizPage