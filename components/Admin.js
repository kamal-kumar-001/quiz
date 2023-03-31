import axios from 'axios';
import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import Modal from './basic/Modal';
import Alert from './basic/Alert';
import Layout from './dashboard/Layout'

const Admin = ({ quizzes, user }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [modalContent, setModalContent] = useState(null);

  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [embedModalContent, setEmbedModalContent] = useState(null);
  const [alert, setAlert] = useState(null);
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // get the token from local storage
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/api/quiz/?id=${id}`, { headers });
      Router.push('/admin/');
      setAlert({ type: 'success', message: '"Quiz deleted successfully"' });
    } catch (error) {
      console.log(error);
    }
  };
  // const handleShowModal = (id) => {
  //   const quizIndex = quizzes.findIndex((quiz) => quiz._id === id);
  //   setModalContent(quizzes[quizIndex]);
  //   setModalOpen(true);
  // };

  const handleShowEmbedModal = (id) => {
    const quizIndex = quizzes.findIndex((quiz) => quiz._id === id);
    setEmbedModalContent(quizzes[quizIndex]);
    setEmbedModalOpen(true);
  };
  const [copied, setCopied] = useState(false);

  function copyToClipboard() {
    const codeBlock = document.querySelector('pre');
    const code = codeBlock.querySelector('code');
    navigator.clipboard.writeText(code?.innerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <>
      <Layout user={user}>
        <div className='h-full w-full  bg-gray-50 dark:bg-slate-500 relative overflow-y-auto p-8 lg:ml-64'>

          <h1 className="text-2xl font-bold mb-4 ">Quiz List</h1>
          {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
          <div className="flex flex-wrap  gap-4">
            {quizzes && quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-white dark:bg-slate-600 rounded-lg overflow-hidden shadow-lg">
                <div className="px-6 py-4  min-w-[300px]">

                  <div className="font-bold text-xl mb-2">{quiz.title}</div>
                  <div className=" text-base">
                    <p>Time Played: {quiz.performance}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link target={'_blank'} href={`/quiz/${quiz.slug}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                        Test
                      </button>
                    </Link>
                    {/* <button onClick={() => handleShowModal(quiz._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Test
                    </button> */}
                    <button onClick={() => handleShowEmbedModal(quiz._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Embed Quiz
                    </button>
                    <Link href={`/admin/updateQuiz/${quiz.slug}`}>
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
          {/* Quiz Modal */}
          {/* {modalContent && (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={modalContent.title}
    >
      <iframe
        className='w-[500px] min-h-[87vh] mx-auto'
        src={`/quiz/${modalContent.slug}`}
      ></iframe>
    </Modal>
  )} */}

          {/* Embed Quiz Modal */}
          {embedModalContent && (
            <Modal
              isOpen={embedModalOpen}
              onClose={() => setEmbedModalOpen(false)}
              title={`Embed Quiz - ${embedModalContent.title}`}
            >
              <p className='text-gray-900'>
                Modify the Data as per Your Need
              </p>
              <div className="relative border-2 border-black  py-2">
                <pre className="">
                  <code className=" p-2 break-words font-mono text-gray-900">
                    {`<iframe title="${embedModalContent.title}" src="http://localhost:3000/quiz/${embedModalContent.slug}" height="600px" width="500px"></iframe>`}
                  </code>
                </pre>
                <button
                  onClick={copyToClipboard}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded absolute top-2 right-2"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </Modal>
          )}

        </div>
      </Layout>
    </>

  );
};

export default Admin;
