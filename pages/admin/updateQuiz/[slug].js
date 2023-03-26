import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import AdminRoute from '../../../components/dashboard/adminRoute';
import Layout from '../../../components/dashboard/Layout';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: [{ text: '', isCorrect: false, explanation: '' }] }]);

  const handleAddQuestionForm = () => {
    setQuestions([...questions, { question: '', options: [{ text: '', isCorrect: false, explanation: '' }] }]);
  };

  const handleDeleteQuestionForm = (index) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions.splice(index, 1);
      return newQuestions;
    });
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? { ...question, [field]: value } : question
      )
    );
  };

  const handleAddOptionForm = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === index ? {
          ...question, options: [
            ...question.options,
            { text: '', isCorrect: false, explanation: '' }
          ]
        } : question
      )
    );
  };

  const handleDeleteOptionForm = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === questionIndex ? {
          ...question, options: [
            ...question.options.slice(0, optionIndex),
            ...question.options.slice(optionIndex + 1)
          ]
        } : question
      )
    );
  };
  const handleOptionChange = (questionIndex, optionIndex, field, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question, i) =>
        i === questionIndex ? {
          ...question, options: question.options.map((option, j) =>
            j === optionIndex ? { ...option, [field]: value } : { ...option, isCorrect: false }
          )
        } : question
      )
    );
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newQuiz = { title, questions };
    try {
      const token = localStorage.getItem('token'); // get the token from local storage
      const headers = { Authorization: `Bearer ${token}` }; // set the token in the Authorization header
      const response = await axios.post('/api/quiz', newQuiz, { headers }); // include the headers in the request
      console.log(response.message);
      Router.push('/admin/');
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <AdminRoute>
    <Layout>
    <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
     <p className='text-2xl text-center'>Coming Soon...</p>
    </div>
    </Layout>
    </AdminRoute>
    
);
};

export default AddQuiz;





