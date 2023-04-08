import React from 'react'
import Layout from '../../components/dashboard/Layout'
import Contact from "../../components/Contact";

const Help = () => {
  return (
    <Layout>
      <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
        <Contact/>
      </div>
    </Layout>
  )
}
export default Help