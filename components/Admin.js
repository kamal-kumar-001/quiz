import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import Layout from './dashboard/Layout'

const Admin = ({ quizzes,user }) => {
  const [message, setMessage] = useState('')
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // get the token from local storage
      const headers = { Authorization: `Bearer ${token}` }; 
      await axios.delete(`/api/quiz/?id=${id}`, { headers });
      Router.push('/admin/');
      setMessage("Quiz deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Layout user={user}>
      <div className='h-full w-full  bg-gray-50 dark:bg-slate-500 relative overflow-y-auto p-8 lg:ml-64'>

     <h1 className="text-2xl font-bold mb-4 ">Quiz List</h1>
      
      <span>{message}</span>
    <div className="flex flex-wrap  gap-4">
      {quizzes && quizzes.map((quiz) => (
        <div key={quiz._id} className="bg-white dark:bg-slate-600 rounded-lg overflow-hidden shadow-lg">
          <div className="px-6 py-4  min-w-[300px]">

            <div className="font-bold text-xl mb-2">{quiz.title}</div>
            <div className=" text-base">
              <p>Time Played: {quiz.performance}</p>
            </div>
            <div className="flex justify-end mt-4">
              <Link href={`/quiz/${quiz.slug}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Test 
                </button>
              </Link>
              <Link href={`/admin/updateQuiz/${quiz._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(quiz._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
      </div>
    </Layout>
    </>

  );
};

export default Admin;
