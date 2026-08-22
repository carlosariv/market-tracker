import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/design-system.css'
import App from './App.tsx'
import { SearchResultsProvider } from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchResultsProvider>
      <App />
    </SearchResultsProvider>
  </StrictMode>,
)
