import React,{useEffect} from 'react'
import LogIn from '../components/Login'
import { useRouter } from 'next/router';
import Head from 'next/head';
function isLoggedIn() {
  // Check if the user is logged in by checking for a token in local storage
  const token = localStorage.getItem('token');
  return token != null;
}
const LogInPage = () => {
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
    <LogIn/>
    </>
  )
}

export default LogInPage