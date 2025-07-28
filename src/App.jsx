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
import { useAuth } from './context/AuthContext';

function App() {
  // authentication
  const { globalUser, globalData, isLoading } = useAuth()
  const isAuthenticated = !!globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length // second is falsey value to check if there is data, otherwise isData will have nothing

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {(isLoading && isAuthenticated) && (<p>Loading data...</p>)}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
  )
}

export default App