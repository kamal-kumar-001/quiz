import Head from 'next/head'
import React from 'react'
import Home from "../components/Home";
const HomePage = () => {
  return (
    <>
        <Head>
          <title>Quiz App</title>
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
        <Home />
      </>
  )
}

export default HomePage