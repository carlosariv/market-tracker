import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import LoginPage from './pages/login/LoginPage'
import TrackerPage from './pages/TrackerPage/TrackerPage'
// Page imports



function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // If the auth is valid, then return the children components
  const isAuthenticated =
    localStorage.getItem('authenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function Logout(){
    const navigate = useNavigate();
  localStorage.removeItem('authenticate');
  navigate('/login');
}

function App() {

  return (
    <BrowserRouter >

      <Routes>
        {/* Mapping routes to urls */}
        <Route path="/login" element={<LoginPage />} />
        <Route path='/markets' element={<ProtectedRoute><TrackerPage /></ProtectedRoute>} />

        {/* Navbar shows up at every page therefore / */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter >
  )
}

export default App
