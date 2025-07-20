import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Authentication from './components/Authentication';
import CoffeeForm from './components/CoffeeForm';
import Hero from './components/Hero';
import History from './components/History';
import Layout from './components/Layout';
import Modal from './components/Modal';
import Stats from './components/Stats';

function App() {
  // authentication
  const isAuthenticated = false;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isAuthenticated && (authenticatedContent)}
    </Layout>
  )
}

export default App
