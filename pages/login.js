import React from 'react'
import LogIn from '../components/Login'
import Head from 'next/head';

export default function LogInPage() {

  return (
    <>
      <Head>
        <title>Quiz | Log In</title>
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
      <LogIn />
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

