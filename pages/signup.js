import React,{useEffect} from 'react'
import Signup from '../components/Signup'
import { useRouter } from 'next/router';
import Head from 'next/head';
function isLoggedIn() {
  // Check if the user is logged in by checking for a token in local storage
  const token = localStorage.getItem('token');
  return token != null;
}
const SignUp = () => {
  const router = useRouter();
  useEffect(() => {
    // Redirect to the login page if the user is not logged in
    if (isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);
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