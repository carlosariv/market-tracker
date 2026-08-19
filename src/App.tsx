import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <BrowserRouter >
      
      <Routes>
        <Route path="/" element={<Navigate to="/pages/LoginPage" replace />} />
        <Navbar />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
