import React from 'react';
import Layout from '../../components/dashboard/Layout';
import TemplateForm from '../../components/dashboard/TemplateForm';
import { hasToken } from '../../middleware/checkUser'
export default function Templates({template }) {
  return (
    <Layout>
      <div className='h-full w-full  bg-gray-50 dark:bg-gray-500 relative overflow-y-auto p-8 lg:ml-64'>
      <TemplateForm  template={template}  />
      </div>
    </Layout>
  );
}
export async function getServerSideProps({  req }) {
  const headers = req.headers;
  const token = await hasToken(req)
  if(!token){
      return {
        redirect: {
          destination: '/login',
              permanent: false
            }
          }
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://quiz-mrnormal128-gmailcom.vercel.app'; 
        // console.log(apiUrl);
        const response = await fetch(`${apiUrl}/api/template`, {
          headers: headers,
        });
        // const res = await fetch(`https://quiz-mrnormal128-gmailcom.vercel.app/api/quiz/${slug}`);
        const data = await response.json();
        // console.log(data);
  return {
    props: {
      template: data?.template || null,
    },
  };
}