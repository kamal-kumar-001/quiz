import React from 'react'
import Layout from '../../../components/dashboard/Layout';
import QuizForm from '../../../components/dashboard/QuizForm';

const UpdateQuizPage = ({quizzes, token}) => {
  return (
    <Layout>
    <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
    <QuizForm mode={'update'} quizzes={quizzes} token={token} />
    </div>
    </Layout>
  )
}
export async function getServerSideProps({ params ,req }) {
  const { slug } = params;
  const token = req.cookies.token;
  if (token == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  let url = req.headers.referer;
  let arr = url.split('/');
  url = `${arr[0]}//${arr[2]}`;
  const res = await fetch(`${url}/api/quiz/${slug}`);
  // const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`);
  const data = await res.json();
  return {
      props: {
          quizzes: data?.quiz || null,
          token,
      },
  };
}
export default UpdateQuizPage