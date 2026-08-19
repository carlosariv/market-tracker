import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <BrowserRouter >
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
