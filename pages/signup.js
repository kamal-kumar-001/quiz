import React, {useEffect, useState} from 'react'
import Signup from '../components/SignUp'
import Head from 'next/head';
import Loading from '../components/loading';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/admin');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }
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
export default SignUp