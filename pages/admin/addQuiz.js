import React from 'react'
import Layout from '../../components/dashboard/Layout'
import QuizForm from '../../components/dashboard/QuizForm'

const AddQuizzes = ({token}) => {
  return (
    <Layout>
      <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
        <QuizForm mode={'add'} token={token}/>
      </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;
  if (token == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
}
export default AddQuizzes;
