import React from 'react'
import Signup from '../components/SignUp'
import Head from 'next/head';
const SignUp = () => {
  return (
    <>
     <Head>
          <title>Quiz | Sign UP</title>
          <meta
            name="description"
            content='create a Quiz with next js'
          />
          <meta
            name="theme-color"
            content="#000"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
    <Signup/>
    </>
  )
}
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token;

  if (token != null) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default SignUp