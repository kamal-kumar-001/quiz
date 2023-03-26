import React from 'react'
import AddQuiz from '../../components/AddQuiz'
import Layout from '../../components/dashboard/Layout'
import AdminRoute from '../../components/dashboard/adminRoute'

const AddQuizzes = () => {
  return (
    <AdminRoute>
    <Layout>
    <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
        <AddQuiz/>
    </div>
    </Layout>
    </AdminRoute>
  )
}

export default AddQuizzes