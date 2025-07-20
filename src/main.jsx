import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// if had another css sheet this is where it would go
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// injects jsx into div with id root