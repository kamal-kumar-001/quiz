import React from 'react'
import AdminRoute from '../../../components/dashboard/adminRoute';
import Layout from '../../../components/dashboard/Layout';
import QuizForm from '../../../components/dashboard/QuizForm';

const UpdateQuizPage = ({quizzes}) => {
  return (
    <AdminRoute>
    <Layout>
    <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
    <QuizForm mode={'update'} quizzes={quizzes} />
    </div>
    </Layout>
    </AdminRoute>
  )
}
export async function getServerSideProps({ params }) {
  const { slug } = params;
  // const res = await fetch(`${baseUrl}/api/blog/${slug}`);
  // const res = await fetch(`http://localhost:3000/api/quiz/${slug}`);
  const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`);
  const data = await res.json();
  return {
      props: {
          quizzes: data?.quiz || null,
      },
  };
}
export default UpdateQuizPage