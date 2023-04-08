import React from 'react'
import Layout from '../../components/dashboard/Layout'
import Profile from '../../components/dashboard/Profile'

const ProfilePage = () => {
  return (
    <Layout>
      <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
        <Profile />
      </div>
    </Layout>
  )
}

export default ProfilePage