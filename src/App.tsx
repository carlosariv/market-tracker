import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LoginPage from './pages/login/LoginPage'
import TrackerPage, { TrackerPageV2 } from './pages/TrackerPage/TrackerPage'
import StockDetailPage from './pages/StockDetail/StockDetail'

import "./styles/main.css"
import { AuthProvider, useAuth } from './components/AuthContext'
import RegisterPage from './pages/login/RegisterPage'

// Auth gate + shared chrome in one layout route.
// Renders for any child route that matches; <Outlet/> is where the page lands.
function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Navbar />
  )
}

function App() {
  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Navbar />}>

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<div></div>} />
            </Route>

            {/* Everything below requires auth and gets shared chrome */}
            <Route element={<ProtectedLayout />}>
              {/* <Route path="/markets" element={<TrackerPage />} /> */}
              <Route path="/markets" element={<TrackerPageV2 />} />
              <Route path="/stocks" element={<StockDetailPage />} />
            </Route>

            {/* Unknown URLs bounce to the app (or to /login if not authed) */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  )
}

export default App