import React from 'react'
import Layout from '../../components/dashboard/Layout'
import QuizForm from '../../components/dashboard/QuizForm'
import { hasToken } from '../../middleware/checkUser'

const AddQuizzes = () => {
  return (
    <Layout>
      <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
        <QuizForm mode={'add'} />
      </div>
    </Layout>
  )
}
export async function getServerSideProps(context) {

  const token = await hasToken(context.req)

  if(!token){
      return {
          redirect: {
              destination: '/login',
              permanent: false
          }
      }
  }

  return { props: {}}
}
export default AddQuizzes;
