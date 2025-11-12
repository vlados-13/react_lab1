import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'
import { UsersProvider } from './context/UsersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </SettingsProvider>
  </StrictMode>,
)
